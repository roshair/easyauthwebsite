(function() {
  'use strict';

  // Native lazy loading for modern browsers
  if ('loading' in HTMLImageElement.prototype) {
    var images = document.querySelectorAll('img[data-src]');
    images.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else if ('IntersectionObserver' in window) {
    // Fallback for browsers that support IntersectionObserver but not native lazy loading
    var imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    var lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(function(img) { imageObserver.observe(img); });
  } else {
    // Final fallback: load all images immediately for legacy browsers
    var allImages = document.querySelectorAll('img[data-src]');
    allImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
})();
