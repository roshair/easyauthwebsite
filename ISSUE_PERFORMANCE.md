# Issue: Implement Performance Optimization

## Title
Optimize Website Performance for Faster Loading and Better User Experience

## Description
Implement comprehensive performance optimizations including image optimization, CSS/JS minification, lazy loading, resource hints, and caching strategies to achieve excellent Lighthouse performance scores and improve user experience.

## Current State
- No image optimization
- Non-minified CSS and JavaScript
- No lazy loading
- No resource hints (preload, prefetch)
- No caching headers configuration
- Bootstrap loaded from CDN could be optimized

## Proposed Implementation

### 1. Image Optimization

#### Implement Modern Image Formats
```html
<!-- Use <picture> element for responsive images with WebP fallback -->
<picture>
  <source srcset="img/hero.webp" type="image/webp">
  <source srcset="img/hero.jpg" type="image/jpeg">
  <img src="img/hero.jpg" alt="Hero image" loading="lazy">
</picture>
```

#### Add Image Lazy Loading
```javascript
// lazy-load.js
(function() {
  'use strict';

  // Native lazy loading for modern browsers
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
    // Fallback for older browsers using Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
  }
})();
```

### 2. CSS Optimization

#### Critical CSS Inlining
```html
<!-- Inline critical CSS directly in <head> -->
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
  .navbar-wrapper { position: absolute; top: 0; left: 0; right: 0; z-index: 20; }
  .carousel { height: 500px; margin-bottom: 60px; }
  /* ... other critical styles ... */
</style>

<!-- Load full CSS asynchronously -->
<link rel="preload" href="css/bootstrap.min.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/bootstrap.min.css"></noscript>
```

#### CSS Minification
```javascript
// Build script using clean-css
const CleanCSS = require('clean-css');
const fs = require('fs');

const input = fs.readFileSync('carousel.css', 'utf8');
const output = new CleanCSS({ level: 2 }).minify(input);

fs.writeFileSync('carousel.min.css', output.styles);
```

### 3. JavaScript Optimization

#### Defer Non-Critical JavaScript
```html
<!-- Defer Bootstrap JS -->
<script src="js/bootstrap.min.js" defer></script>

<!-- Async for analytics -->
<script src="analytics.js" async></script>
```

#### Code Splitting
```javascript
// Load features on demand
document.getElementById('contactLink').addEventListener('click', async () => {
  const { ContactForm } = await import('./contact-form.js');
  new ContactForm('contactForm');
});
```

### 4. Resource Hints

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://azure.microsoft.com">
<link rel="dns-prefetch" href="https://azure.microsoft.com">

<!-- Preload critical resources -->
<link rel="preload" href="css/bootstrap.min.css" as="style">
<link rel="preload" href="fonts/glyphicons-halflings-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="js/bootstrap.min.js" as="script">

<!-- Prefetch next likely navigation -->
<link rel="prefetch" href="documentation.html">
```

### 5. Caching Strategy

#### web.config for Azure App Service
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <staticContent>
      <!-- Cache static assets for 1 year -->
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
      
      <!-- Set MIME types -->
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
    
    <!-- Enable compression -->
    <urlCompression doStaticCompression="true" doDynamicCompression="true" />
    
    <!-- HTTP/2 push headers -->
    <httpProtocol>
      <customHeaders>
        <add name="Link" value="&lt;/css/bootstrap.min.css&gt;; rel=preload; as=style" />
        <add name="Link" value="&lt;/js/bootstrap.min.js&gt;; rel=preload; as=script" />
      </customHeaders>
    </httpProtocol>
    
    <!-- Rewrite rules for versioned assets -->
    <rewrite>
      <rules>
        <rule name="Fingerprinted Assets">
          <match url="^(.*)\.([0-9]+)\.(css|js|jpg|png|gif|svg|woff|woff2)$" />
          <action type="Rewrite" url="{R:1}.{R:3}" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### 6. Font Optimization

```html
<!-- Use font-display: swap for web fonts -->
<style>
  @font-face {
    font-family: 'Glyphicons Halflings';
    src: url('fonts/glyphicons-halflings-regular.woff2') format('woff2'),
         url('fonts/glyphicons-halflings-regular.woff') format('woff');
    font-display: swap;
  }
</style>

<!-- Preload critical fonts -->
<link rel="preload" href="fonts/glyphicons-halflings-regular.woff2" as="font" type="font/woff2" crossorigin>
```

### 7. Performance Monitoring

```javascript
// performance-monitor.js
(function() {
  'use strict';

  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    let clsScore = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsScore += entry.value;
          console.log('CLS:', clsScore);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Log timing metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('Page Load Time:', pageLoadTime + 'ms');
      console.log('Connect Time:', connectTime + 'ms');
      console.log('Render Time:', renderTime + 'ms');
    }, 0);
  });
})();
```

### 8. Build Script Package.json

```json
{
  "name": "azure-app-service-site",
  "version": "1.0.0",
  "scripts": {
    "minify:css": "cleancss -o css/bootstrap.min.css css/bootstrap.css && cleancss -o carousel.min.css carousel.css",
    "minify:js": "uglifyjs js/bootstrap.js -o js/bootstrap.min.js -c -m",
    "optimize:images": "imagemin img/* --out-dir=img/optimized --plugin=webp --plugin=mozjpeg",
    "build": "npm run minify:css && npm run minify:js && npm run optimize:images",
    "lighthouse": "lighthouse http://localhost:8080 --view"
  },
  "devDependencies": {
    "clean-css-cli": "^5.6.2",
    "uglify-js": "^3.17.4",
    "imagemin-cli": "^7.0.0",
    "imagemin-webp": "^7.0.0",
    "imagemin-mozjpeg": "^10.0.0",
    "lighthouse": "^10.4.0"
  }
}
```

## Files to Create/Modify

### New Files:
1. `lazy-load.js` - Image lazy loading implementation
2. `performance-monitor.js` - Core Web Vitals tracking
3. `web.config` - Azure App Service caching and compression
4. `package.json` - Build scripts for minification
5. `.htaccess` - Alternative for non-Azure hosting

### Modified Files:
1. `index.html` - Add resource hints, update asset references
2. Create minified versions: `carousel.min.css`, `dark-mode.min.css`

### Build Process:
1. Minify all CSS and JavaScript
2. Convert images to WebP with JPEG fallbacks
3. Generate critical CSS
4. Add cache-busting hashes to filenames

## Acceptance Criteria

- [ ] Lighthouse Performance score > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] All images lazy loaded below fold
- [ ] CSS and JS files minified
- [ ] Images converted to WebP with fallbacks
- [ ] Resource hints implemented (preload, prefetch, preconnect)
- [ ] Caching headers configured
- [ ] Gzip/Brotli compression enabled
- [ ] Font loading optimized with font-display: swap

## Testing Checklist

- [ ] Run Lighthouse audit (Performance, Best Practices)
- [ ] Test on slow 3G connection
- [ ] Verify lazy loading works
- [ ] Check WebP fallback for unsupported browsers
- [ ] Verify caching headers with browser dev tools
- [ ] Test with browser caching disabled
- [ ] Measure Core Web Vitals
- [ ] Test on low-end devices
- [ ] Verify no render-blocking resources
- [ ] Check Time to First Byte (TTFB)
- [ ] Test compression with tools like GTmetrix
- [ ] Verify resource hints working

## Priority
High

## Labels
`enhancement`, `performance`, `optimization`, `lighthouse`, `core-web-vitals`

## Estimated Effort
8-10 hours

## Success Metrics
- **Before:** ~60-70 Lighthouse performance score
- **Target:** 90+ Lighthouse performance score
- **Load Time:** < 2 seconds on 3G
- **Bundle Size:** Reduce by 40-50%

## Resources
- [Web.dev: Performance](https://web.dev/performance/)
- [Web.dev: Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Can I Use: WebP](https://caniuse.com/webp)
- [Azure: Static Website Optimization](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-content-delivery-network)
