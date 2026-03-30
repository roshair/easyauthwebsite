# Issue: Convert Website to Progressive Web App (PWA)

## Title
Transform Site into Installable Progressive Web App with Offline Support

## Description
Convert the website into a Progressive Web App (PWA) to enable installation on devices, provide offline functionality, and improve loading performance. This modernizes the user experience and demonstrates cutting-edge web capabilities.

## Current State
- Standard website with no offline capability
- Not installable on devices
- No service worker for caching
- No app manifest

## Proposed Implementation

### 1. Web App Manifest

Create `manifest.json`:

```json
{
  "name": "Azure App Service Web Apps",
  "short_name": "Azure Apps",
  "description": "Create and deploy mission-critical web apps that scale with your business.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0078d4",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "img/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "img/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "img/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "related_applications": [],
  "prefer_related_applications": false,
  "screenshots": [
    {
      "src": "img/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide"
    },
    {
      "src": "img/screenshots/mobile.png",
      "sizes": "750x1334",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["productivity", "business"],
  "shortcuts": [
    {
      "name": "Documentation",
      "short_name": "Docs",
      "description": "View Azure App Service documentation",
      "url": "/docs",
      "icons": [{ "src": "img/icons/docs-icon.png", "sizes": "192x192" }]
    },
    {
      "name": "Pricing",
      "short_name": "Pricing",
      "description": "View pricing details",
      "url": "/pricing",
      "icons": [{ "src": "img/icons/pricing-icon.png", "sizes": "192x192" }]
    }
  ]
}
```

### 2. Service Worker Implementation

Create `service-worker.js`:

```javascript
const CACHE_NAME = 'azure-app-v1';
const RUNTIME_CACHE = 'runtime-cache';

// Assets to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/css/bootstrap.min.css',
  '/css/bootstrap-theme.min.css',
  '/carousel.css',
  '/dark-mode.css',
  '/js/bootstrap.min.js',
  '/dark-mode.js',
  '/manifest.json',
  '/img/icons/icon-192x192.png',
  '/img/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('[ServiceWorker] Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(RUNTIME_CACHE)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(error => {
          console.log('[ServiceWorker] Fetch failed:', error);
          
          // Return offline page for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
        });
      })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(syncForms());
  }
});

async function syncForms() {
  // Retrieve pending form submissions from IndexedDB
  // Send them to the server
  console.log('[ServiceWorker] Syncing pending forms');
}

// Push notification support
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Azure App Service';
  const options = {
    body: data.body || 'New notification',
    icon: '/img/icons/icon-192x192.png',
    badge: '/img/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
```

### 3. Service Worker Registration

Create `pwa-init.js`:

```javascript
// PWA Installation and Service Worker Registration
(function() {
  'use strict';

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registered:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour
        })
        .catch(error => {
          console.log('ServiceWorker registration failed:', error);
        });
    });
  }

  // Install prompt
  let deferredPrompt;
  const installButton = document.createElement('button');
  installButton.id = 'installButton';
  installButton.className = 'btn btn-success install-btn';
  installButton.innerHTML = '<i class="glyphicon glyphicon-download-alt"></i> Install App';
  installButton.style.display = 'none';

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent default prompt
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    installButton.style.display = 'block';
    document.body.appendChild(installButton);
  });

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = 'none';
  });

  // Track installation
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    deferredPrompt = null;
    installButton.style.display = 'none';
  });

  // Check if app is installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running as installed PWA');
  }
})();
```

### 4. Offline Page

Create `offline.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Offline - Azure App Service</title>
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      padding: 20px;
    }
    .offline-content h1 {
      font-size: 72px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="offline-content">
    <h1>📡</h1>
    <h2>You're Offline</h2>
    <p>It looks like you've lost your internet connection.</p>
    <p>Don't worry, you can still browse cached pages.</p>
    <button class="btn btn-light btn-lg" onclick="location.reload()">
      Try Again
    </button>
  </div>
</body>
</html>
```

### 5. HTML Meta Tags

Add to `<head>` in `index.html`:

```html
<!-- PWA Configuration -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#0078d4">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Azure Apps">
<link rel="apple-touch-icon" href="/img/icons/icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/img/icons/icon-180x180.png">
<link rel="apple-touch-icon" sizes="167x167" href="/img/icons/icon-167x167.png">
<meta name="msapplication-TileImage" content="/img/icons/icon-144x144.png">
<meta name="msapplication-TileColor" content="#0078d4">

<!-- PWA Script -->
<script src="/pwa-init.js"></script>
```

## Files to Create/Modify

### New Files:
1. `manifest.json` - PWA manifest
2. `service-worker.js` - Service worker with caching strategy
3. `pwa-init.js` - Service worker registration and install prompt
4. `offline.html` - Offline fallback page
5. `img/icons/` - App icons (8 sizes: 72, 96, 128, 144, 152, 192, 384, 512)
6. `img/screenshots/` - App screenshots for app stores

### Modified Files:
1. `index.html` - Add PWA meta tags and manifest link

## Acceptance Criteria

- [ ] Manifest validates on Lighthouse PWA audit
- [ ] Service worker registers successfully
- [ ] App can be installed on desktop and mobile
- [ ] Offline functionality works (cached pages load)
- [ ] Install prompt appears for eligible browsers
- [ ] App icons display correctly when installed
- [ ] Theme color applies in standalone mode
- [ ] Offline page displays when network unavailable
- [ ] Cache updates when new version deployed
- [ ] PWA passes Lighthouse audit (score > 90)
- [ ] Works in Chrome, Edge, Safari, Firefox
- [ ] Splash screen displays on app launch (mobile)

## Testing Checklist

- [ ] Test installation on Chrome (desktop & mobile)
- [ ] Test installation on Edge
- [ ] Test installation on Safari (iOS)
- [ ] Test offline mode (dev tools > offline)
- [ ] Test cache updates after deployment
- [ ] Run Lighthouse PWA audit
- [ ] Test app icons appear correctly
- [ ] Test theme color in standalone mode
- [ ] Test offline page fallback
- [ ] Test service worker updates
- [ ] Verify manifest in browser dev tools
- [ ] Test on slow 3G connection

## Priority
Medium-High

## Labels
`enhancement`, `pwa`, `offline`, `performance`, `mobile`

## Estimated Effort
6-8 hours (including icon generation)

## Dependencies
- Icon generation tool (e.g., PWA Asset Generator)
- HTTPS deployment (PWA requires HTTPS)
- App screenshots for app stores

## Optional Enhancements
- Push notifications for updates
- Background sync for form submissions
- Periodic background sync
- Share target API
- File handling

## Resources
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev: PWA Checklist](https://web.dev/pwa-checklist/)
- [Google: Workbox (Service Worker Library)](https://developers.google.com/web/tools/workbox)
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
