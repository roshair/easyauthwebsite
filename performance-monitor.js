(function() {
  'use strict';

  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    try {
      new PerformanceObserver(function(list) {
        var entries = list.getEntries();
        var lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {}

    // First Input Delay
    try {
      new PerformanceObserver(function(list) {
        list.getEntries().forEach(function(entry) {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });
    } catch (e) {}

    // Cumulative Layout Shift
    try {
      var clsScore = 0;
      new PerformanceObserver(function(list) {
        list.getEntries().forEach(function(entry) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
            console.log('CLS:', clsScore);
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    } catch (e) {}
  }

  // Log timing metrics after page load
  window.addEventListener('load', function() {
    setTimeout(function() {
      // Prefer Navigation Timing Level 2 API; fall back to deprecated timing for older browsers
      var nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]);
      if (nav) {
        console.log('Page Load Time:', Math.round(nav.duration) + 'ms');
        console.log('Connect Time:', Math.round(nav.responseEnd - nav.requestStart) + 'ms');
        console.log('Render Time:', Math.round(nav.domComplete - nav.domInteractive) + 'ms');
      } else if (performance.timing) {
        var perfData = performance.timing;
        console.log('Page Load Time:', (perfData.loadEventEnd - perfData.navigationStart) + 'ms');
        console.log('Connect Time:', (perfData.responseEnd - perfData.requestStart) + 'ms');
        console.log('Render Time:', (perfData.domComplete - perfData.domLoading) + 'ms');
      }
    }, 0);
  });
})();
