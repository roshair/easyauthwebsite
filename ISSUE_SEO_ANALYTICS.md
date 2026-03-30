# Issue: Implement SEO Optimization and Analytics

## Title
Add SEO Best Practices and Analytics Tracking for Better Discoverability

## Description
Implement comprehensive SEO optimization including meta tags, structured data, Open Graph tags, XML sitemap, and integrate analytics tracking (Application Insights/Google Analytics) to improve search engine rankings and track user behavior.

## Current State
- Minimal meta tags (charset, viewport only)
- No structured data (Schema.org)
- No Open Graph/Twitter Card tags
- No XML sitemap
- No robots.txt
- No analytics tracking
- No social media preview optimization

## Proposed Implementation

### 1. Enhanced Meta Tags

```html
<!-- Add to <head> in index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Essential Meta Tags -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- SEO Meta Tags -->
  <title>Azure App Service Web Apps - Deploy and Scale with Confidence</title>
  <meta name="description" content="Create and deploy mission-critical web apps that scale with your business. Azure App Service supports .NET, Java, PHP, Node.js, and Python with built-in autoscale, load balancing, and high availability.">
  <meta name="keywords" content="Azure App Service, Web Apps, Cloud Hosting, PaaS, Microsoft Azure, Deploy Web Apps, Scalable Hosting, .NET Hosting, Node.js Hosting, PHP Hosting">
  <meta name="author" content="Microsoft Azure">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="https://yourdomain.com/">
  
  <!-- Open Graph Meta Tags (Facebook, LinkedIn) -->
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Azure App Service Web Apps - Deploy and Scale with Confidence">
  <meta property="og:description" content="Create and deploy mission-critical web apps that scale with your business. Enterprise-grade hosting with 99.95% SLA.">
  <meta property="og:url" content="https://yourdomain.com/">
  <meta property="og:site_name" content="Azure App Service Demo">
  <meta property="og:image" content="https://yourdomain.com/img/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Azure App Service Dashboard">
  
  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@Azure">
  <meta name="twitter:creator" content="@Azure">
  <meta name="twitter:title" content="Azure App Service Web Apps">
  <meta name="twitter:description" content="Create and deploy mission-critical web apps that scale with your business.">
  <meta name="twitter:image" content="https://yourdomain.com/img/twitter-card.jpg">
  <meta name="twitter:image:alt" content="Azure App Service Dashboard">
  
  <!-- Additional SEO Tags -->
  <meta name="format-detection" content="telephone=no">
  <meta name="theme-color" content="#0078d4">
  <meta name="apple-mobile-web-app-title" content="Azure Apps">
  
  <!-- Favicon and Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="img/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="img/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="img/apple-touch-icon.png">
  <link rel="manifest" href="manifest.json">
</head>
```

### 2. Structured Data (JSON-LD)

```html
<!-- Add before closing </head> tag -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Azure App Service Web Apps",
  "url": "https://yourdomain.com",
  "description": "Create and deploy mission-critical web apps that scale with your business.",
  "publisher": {
    "@type": "Organization",
    "name": "Microsoft Azure",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/img/logo.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yourdomain.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Microsoft Azure",
  "url": "https://azure.microsoft.com",
  "logo": "https://yourdomain.com/img/azure-logo.png",
  "sameAs": [
    "https://twitter.com/Azure",
    "https://facebook.com/MicrosoftAzure",
    "https://linkedin.com/company/microsoft-azure",
    "https://youtube.com/c/MicrosoftAzure"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "url": "https://azure.microsoft.com/support/"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Azure App Service",
  "applicationCategory": "DeveloperApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free tier available"
  },
  "operatingSystem": "Any",
  "description": "Fully managed platform for building, deploying, and scaling web apps.",
  "featureList": [
    "Supports .NET, Java, PHP, Node.js, Python",
    "Built-in autoscale and load balancing",
    "High availability with auto-patching",
    "Continuous deployment",
    "99.95% SLA"
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourdomain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Features",
      "item": "https://yourdomain.com#features"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Documentation",
      "item": "https://yourdomain.com#docs"
    }
  ]
}
</script>
```

### 3. XML Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://yourdomain.com/img/hero.jpg</image:loc>
      <image:title>Azure App Service Hero</image:title>
    </image:image>
  </url>
  <url>
    <loc>https://yourdomain.com/#about</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/#features</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://yourdomain.com/#contact</loc>
    <lastmod>2026-03-30</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

### 4. Robots.txt

Create `robots.txt`:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin or private directories (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$

# Sitemap location
Sitemap: https://yourdomain.com/sitemap.xml

# Crawl delay (optional, 1 second)
Crawl-delay: 1
```

### 5. Azure Application Insights

```html
<!-- Add before closing </head> tag -->
<script type="text/javascript">
  !function(T,l,y){var S=T.location,k="script",D="instrumentationKey",C="ingestionendpoint",I="disableExceptionTracking",E="ai.device.",b="toLowerCase",w="crossOrigin",N="POST",e="appInsightsSDK",t=y.name||"appInsights";(y.name||T[e])&&(T[e]=t);var n=T[t]||function(d){var g=!1,f=!1,m={initialize:!0,queue:[],sv:"5",version:2,config:d};function v(e,t){var n={},a="Browser";return n[E+"id"]=a[b](),n[E+"type"]=a,n["ai.operation.name"]=S&&S.pathname||"_unknown_",n["ai.internal.sdkVersion"]="javascript:snippet_"+(m.sv||m.version),{time:function(){var e=new Date;function t(e){var t=""+e;return 1===t.length&&(t="0"+t),t}return e.getUTCFullYear()+"-"+t(1+e.getUTCMonth())+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())+"."+((e.getUTCMilliseconds()/1e3).toFixed(3)+"").slice(2,5)+"Z"}(),iKey:e,name:"Microsoft.ApplicationInsights."+e.replace(/-/g,"")+"."+t,sampleRate:100,tags:n,data:{baseData:{ver:2}}}}var h=d.url||y.src;if(h){function a(e){var t,n,a,i,r,o,s,c,u,p,l;g=!0,m.queue=[],f||(f=!0,t=h,s=function(){var e={},t=d.connectionString;if(t)for(var n=t.split(";"),a=0;a<n.length;a++){var i=n[a].split("=");2===i.length&&(e[i[0][b]()]=i[1])}if(!e[C]){var r=e.endpointsuffix,o=r?e.location:null;e[C]="https://"+(o?o+".":"")+"dc."+(r||"services.visualstudio.com")}return e}(),c=s[D]||d[D]||"",u=s[C],p=u?u+"/v2/track":d.endpointUrl,(l=[]).push((n="SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details)",a=t,i=p,(o=(r=v(c,"Exception")).data).baseType="ExceptionData",o.baseData.exceptions=[{typeName:"SDKLoadFailed",message:n.replace(/\./g,"-"),hasFullStack:!1,stack:n+"\nSnippet failed to load ["+a+"] -- Telemetry is disabled\nHelp Link: https://go.microsoft.com/fwlink/?linkid=2128109\nHost: "+(S&&S.pathname||"_unknown_")+"\nEndpoint: "+i,parsedStack:[]}],r)),l.push(function(e,t,n,a){var i=v(c,"Message"),r=i.data;r.baseType="MessageData";var o=r.baseData;return o.message='AI (Internal): 99 message:"'+("SDK LOAD Failure: Failed to load Application Insights SDK script (See stack for details) ("+n+")").replace(/\"/g,"")+'"',o.properties={endpoint:a},i}(0,0,t,p)),function(e,t){if(JSON){var n=T.fetch;if(n&&!y.useXhr)n(t,{method:N,body:JSON.stringify(e),mode:"cors"});else if(XMLHttpRequest){var a=new XMLHttpRequest;a.open(N,t),a.setRequestHeader("Content-type","application/json"),a.send(JSON.stringify(e))}}}(l,p))}function i(e,t){f||setTimeout(function(){!t&&m.core||a()},500)}var e=function(){var n=l.createElement(k);n.src=h;var e=y[w];return!e&&""!==e||"undefined"==n[w]||(n[w]=e),n.onload=i,n.onerror=a,n.onreadystatechange=function(e,t){"loaded"!==n.readyState&&"complete"!==n.readyState||i(0,t)},n}();y.ld<0?l.getElementsByTagName("head")[0].appendChild(e):setTimeout(function(){l.getElementsByTagName(k)[0].parentNode.appendChild(e)},y.ld||0)}try{m.cookie=l.cookie}catch(p){}function t(e){for(;e.length;)!function(t){m[t]=function(){var e=arguments;g||m.queue.push(function(){m[t].apply(m,e)})}}(e.pop())}var n="track",r="TrackPage",o="TrackEvent";t([n+"Event",n+"PageView",n+"Exception",n+"Trace",n+"DependencyData",n+"Metric",n+"PageViewPerformance","start"+r,"stop"+r,"start"+o,"stop"+o,"addTelemetryInitializer","setAuthenticatedUserContext","clearAuthenticatedUserContext","flush"]),m.SeverityLevel={Verbose:0,Information:1,Warning:2,Error:3,Critical:4};var s=(d.extensionConfig||{}).ApplicationInsightsAnalytics||{};if(!0!==d[I]&&!0!==s[I]){var c="onerror";t(["_"+c]);var u=T[c];T[c]=function(e,t,n,a,i){var r=u&&u(e,t,n,a,i);return!0!==r&&m["_"+c]({message:e,url:t,lineNumber:n,columnNumber:a,error:i}),r},d.autoExceptionInstrumented=!0}return m}(y.cfg);function a(){y.onInit&&y.onInit(n)}(T[t]=n).queue&&0===n.queue.length?(n.queue.push(a),n.trackPageView({})):a()}(window,document,{
    src: "https://js.monitor.azure.com/scripts/b/ai.2.min.js",
    crossOrigin: "anonymous",
    cfg: {
      instrumentationKey: "YOUR_INSTRUMENTATION_KEY_HERE",
      enableAutoRouteTracking: true,
      disableAjaxTracking: false,
      enableCorsCorrelation: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      distributedTracingMode: 2
    }
  });
</script>
```

### 6. Google Analytics 4

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'page_title': document.title,
    'page_location': window.location.href,
    'send_page_view': true
  });

  // Track custom events
  function trackEvent(category, action, label) {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }

  // Track button clicks
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.classList.contains('btn')) {
      trackEvent('Button', 'Click', e.target.textContent);
    }
  });
</script>
```

### 7. SEO-Friendly URL Structure

```javascript
// seo-urls.js - For single-page app routing
class SEORouter {
  constructor() {
    this.routes = {
      '/': 'home',
      '/features': 'features',
      '/pricing': 'pricing',
      '/contact': 'contact'
    };
    this.init();
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    this.handleRoute();
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
    
    // Track page view
    if (window.gtag) {
      gtag('config', 'G-XXXXXXXXXX', {
        'page_path': path
      });
    }
  }

  handleRoute() {
    const path = window.location.pathname;
    const section = this.routes[path] || 'home';
    
    // Update page title
    document.title = `Azure App Service - ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    
    // Show appropriate section
    this.showSection(section);
  }

  showSection(section) {
    document.querySelectorAll('.page-section').forEach(el => {
      el.style.display = 'none';
    });
    
    const target = document.getElementById(section);
    if (target) {
      target.style.display = 'block';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new SEORouter());
```

### 8. Social Media Images

Create optimized images:
- `og-image.jpg` - 1200x630px for Open Graph
- `twitter-card.jpg` - 1200x675px for Twitter Card
- Images should be under 1MB
- Include branding and descriptive text
- Use tools like Canva or Figma

## Files to Create/Modify

### New Files:
1. `sitemap.xml` - XML sitemap for search engines
2. `robots.txt` - Crawler instructions
3. `img/og-image.jpg` - Open Graph image (1200x630)
4. `img/twitter-card.jpg` - Twitter Card image (1200x675)
5. `img/favicon-32x32.png` - Favicon
6. `img/favicon-16x16.png` - Small favicon
7. `img/apple-touch-icon.png` - iOS icon (180x180)

### Modified Files:
1. `index.html` - Add all SEO meta tags and tracking scripts

## Acceptance Criteria

- [ ] All pages have unique, descriptive titles (<60 chars)
- [ ] Meta descriptions present and compelling (<160 chars)
- [ ] Structured data validates on Schema.org validator
- [ ] Open Graph tags display correctly in Facebook debugger
- [ ] Twitter Cards render properly in Card validator
- [ ] XML sitemap validates and submitted to search consoles
- [ ] robots.txt properly configured
- [ ] Analytics tracking installed and working
- [ ] Custom events tracked (button clicks, form submissions)
- [ ] Canonical URLs set correctly
- [ ] Alt text present on all images
- [ ] Heading hierarchy proper (H1 -> H2 -> H3)
- [ ] Internal linking structure optimized

## Testing Checklist

- [ ] Validate structured data (Schema.org validator)
- [ ] Test Open Graph (Facebook Sharing Debugger)
- [ ] Test Twitter Card (Twitter Card Validator)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify robots.txt (Google Search Console)
- [ ] Test analytics tracking (Real-Time reports)
- [ ] Run Lighthouse SEO audit (score 100)
- [ ] Check mobile-friendliness (Google test)
- [ ] Verify page speed (PageSpeed Insights)
- [ ] Test social sharing previews
- [ ] Check indexing status after 1 week

## Priority
High

## Labels
`seo`, `analytics`, `meta-tags`, `structured-data`, `marketing`

## Estimated Effort
4-6 hours (+ ongoing monitoring)

## Success Metrics
- Lighthouse SEO score: 100
- Google Search Console: No errors
- Social shares: Proper preview cards
- Analytics: Event tracking functional
- Search visibility: Improved rankings after 4-6 weeks

## Resources
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Application Insights](https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [Google Analytics 4](https://analytics.google.com/)
