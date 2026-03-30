# Issue: Add Smooth Scroll and Scroll Animations

## Title
Implement Smooth Scrolling and Scroll-Triggered Animations

## Description
Add smooth scrolling navigation and scroll-triggered animations to enhance user experience. Elements should fade in, slide, or animate as they enter the viewport, creating a more engaging and modern feel.

## Current State
- Default browser scroll behavior (jumpy)
- Static content with no animation
- No visual feedback when scrolling to sections
- Navigation instant jumps

## Proposed Implementation

### 1. Smooth Scroll Navigation

```css
/* Smooth scroll (CSS-only) */
html {
  scroll-behavior: smooth;
}

/* Disable for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

```javascript
// smooth-scroll.js - Enhanced smooth scroll with offset for fixed navbar
(function() {
  'use strict';

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, this.getAttribute('href'));
        
        // Set focus for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
  });
})();
```

### 2. Scroll Animation Library (Vanilla JS)

```javascript
// scroll-animations.js
class ScrollAnimator {
  constructor(options = {}) {
    this.options = {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
      animationClass: 'animated',
      ...options
    };
    
    this.observer = null;
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: this.options.threshold,
          rootMargin: this.options.rootMargin
        }
      );
      
      this.observe();
    } else {
      // Fallback: show all animations immediately
      this.showAllAnimations();
    }
  }

  observe() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
      el.classList.add('animate-on-scroll');
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.dataset.animate;
        const delay = element.dataset.animateDelay || 0;
        
        setTimeout(() => {
          element.classList.add(this.options.animationClass);
          element.classList.add(`animate-${animationType}`);
        }, delay);
        
        // Unobserve after animation (one-time animation)
        if (!element.dataset.animateRepeat) {
          this.observer.unobserve(element);
        }
      } else {
        // Re-add animation class if repeat is enabled
        if (entry.target.dataset.animateRepeat) {
          entry.target.classList.remove(this.options.animationClass);
          entry.target.classList.remove(`animate-${entry.target.dataset.animate}`);
        }
      }
    });
  }

  showAllAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => {
      el.classList.add(this.options.animationClass);
      el.classList.add(`animate-${el.dataset.animate}`);
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReducedMotion) {
    new ScrollAnimator();
  }
});
```

### 3. Animation CSS

```css
/* animations.css */

/* Base state for animated elements */
.animate-on-scroll {
  opacity: 0;
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.animated {
  opacity: 1;
}

/* Fade In */
.animate-fade {
  opacity: 0;
}

.animate-fade.animated {
  opacity: 1;
}

/* Fade In Up */
.animate-fade-up {
  transform: translateY(50px);
}

.animate-fade-up.animated {
  transform: translateY(0);
}

/* Fade In Down */
.animate-fade-down {
  transform: translateY(-50px);
}

.animate-fade-down.animated {
  transform: translateY(0);
}

/* Fade In Left */
.animate-fade-left {
  transform: translateX(-50px);
}

.animate-fade-left.animated {
  transform: translateX(0);
}

/* Fade In Right */
.animate-fade-right {
  transform: translateX(50px);
}

.animate-fade-right.animated {
  transform: translateX(0);
}

/* Scale Up */
.animate-scale {
  transform: scale(0.8);
}

.animate-scale.animated {
  transform: scale(1);
}

/* Rotate In */
.animate-rotate {
  transform: rotate(-10deg) scale(0.8);
}

.animate-rotate.animated {
  transform: rotate(0deg) scale(1);
}

/* Slide In Left */
.animate-slide-left {
  transform: translateX(-100%);
}

.animate-slide-left.animated {
  transform: translateX(0);
}

/* Slide In Right */
.animate-slide-right {
  transform: translateX(100%);
}

.animate-slide-right.animated {
  transform: translateX(0);
}

/* Bounce In */
.animate-bounce {
  animation: none;
}

.animate-bounce.animated {
  animation: bounceIn 0.8s ease;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Flip In */
.animate-flip {
  transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
}

.animate-flip.animated {
  transform: perspective(400px) rotate3d(1, 0, 0, 0deg);
}

/* Stagger animations for lists */
.stagger-animation > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.stagger-animation.animated > * {
  opacity: 1;
  transform: translateY(0);
}

.stagger-animation.animated > *:nth-child(1) { transition-delay: 0.1s; }
.stagger-animation.animated > *:nth-child(2) { transition-delay: 0.2s; }
.stagger-animation.animated > *:nth-child(3) { transition-delay: 0.3s; }
.stagger-animation.animated > *:nth-child(4) { transition-delay: 0.4s; }
.stagger-animation.animated > *:nth-child(5) { transition-delay: 0.5s; }
.stagger-animation.animated > *:nth-child(6) { transition-delay: 0.6s; }

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll,
  .animate-on-scroll * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

### 4. Scroll Progress Indicator

```javascript
// scroll-progress.js
(function() {
  'use strict';

  // Create progress bar
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
  document.body.prepend(progressBar);

  const progressBarFill = progressBar.querySelector('.scroll-progress-bar');

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBarFill.style.width = scrolled + '%';
  });
})();
```

```css
/* Scroll progress bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: transparent;
  z-index: 9999;
}

.scroll-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #0078d4, #00bcf2);
  transition: width 0.1s ease;
}
```

### 5. Parallax Scroll Effect

```javascript
// parallax.js
class ParallaxScroll {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    window.addEventListener('scroll', () => this.handleScroll());
    this.handleScroll(); // Initial position
  }

  handleScroll() {
    const scrolled = window.pageYOffset;
    
    this.elements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      const offset = scrolled * speed;
      element.style.transform = `translateY(${offset}px)`;
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    new ParallaxScroll();
  }
});
```

### 6. HTML Implementation Examples

```html
<!-- Add animations to index.html -->

<!-- Hero section -->
<div class="carousel-caption">
  <h1 data-animate="fade-down">Azure App Service Web Apps</h1>
  <p data-animate="fade-up" data-animate-delay="200">
    Create and deploy mission-critical web apps
  </p>
  <ul class="list-unstyled stagger-animation" data-animate="fade">
    <li>Supports .NET, Java, PHP, Node.js, and Python</li>
    <li>Built-in autoscale and load balancing</li>
    <li>High availability with auto-patching</li>
  </ul>
</div>

<!-- Feature sections -->
<section class="feature-section">
  <div class="container">
    <div class="row">
      <div class="col-md-4" data-animate="fade-right">
        <h3>Fast Deployment</h3>
        <p>Deploy your apps in seconds...</p>
      </div>
      <div class="col-md-4" data-animate="fade-up" data-animate-delay="100">
        <h3>Auto Scaling</h3>
        <p>Scale automatically based on demand...</p>
      </div>
      <div class="col-md-4" data-animate="fade-left" data-animate-delay="200">
        <h3>High Availability</h3>
        <p>99.95% SLA guaranteed...</p>
      </div>
    </div>
  </div>
</section>

<!-- Parallax background -->
<div class="parallax-section" data-parallax data-parallax-speed="0.3">
  <div class="container">
    <h2>Experience the Power of Azure</h2>
  </div>
</div>
```

### 7. Back to Top Button

```javascript
// back-to-top.js
(function() {
  'use strict';

  const button = document.createElement('button');
  button.id = 'backToTop';
  button.className = 'back-to-top';
  button.innerHTML = '↑';
  button.setAttribute('aria-label', 'Back to top');
  button.style.display = 'none';
  document.body.appendChild(button);

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      button.style.display = 'block';
    } else {
      button.style.display = 'none';
    }
  });

  // Scroll to top on click
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
```

```css
/* Back to top button */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #0078d4;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.back-to-top:hover {
  opacity: 1;
  transform: translateY(-5px);
}

.back-to-top:active {
  transform: translateY(-2px);
}
```

## Files to Create/Modify

### New Files:
1. `smooth-scroll.js` - Enhanced smooth scrolling with offset
2. `scroll-animations.js` - Intersection Observer animation system
3. `animations.css` - All animation styles
4. `scroll-progress.js` - Scroll progress indicator
5. `parallax.js` - Parallax scrolling effects
6. `back-to-top.js` - Back to top button

### Modified Files:
1. `index.html` - Add data-animate attributes to elements
2. `carousel.css` - May need adjustments for animations

## Acceptance Criteria

- [ ] Smooth scrolling works for all anchor links
- [ ] Navbar offset accounted for in scroll position
- [ ] Elements animate when scrolling into view
- [ ] Animations respect prefers-reduced-motion
- [ ] No janky or stuttering animations
- [ ] Scroll progress bar shows at top of page
- [ ] Back to top button appears after scrolling down
- [ ] Parallax effect subtle and performant
- [ ] Staggered animations for lists work correctly
- [ ] All animations have fallbacks for older browsers
- [ ] No layout shift during animations
- [ ] Animations work on mobile devices

## Testing Checklist

- [ ] Test smooth scroll on all anchor links
- [ ] Test with keyboard navigation
- [ ] Verify animations trigger at right scroll position
- [ ] Test with prefers-reduced-motion enabled
- [ ] Check performance (no jank, 60fps)
- [ ] Test on mobile devices (iOS/Android)
- [ ] Verify in older browsers (IE11 with polyfills)
- [ ] Test parallax on different scroll speeds
- [ ] Verify back to top button functionality
- [ ] Test scroll progress accuracy
- [ ] Check animation timing feels natural
- [ ] Verify no cumulative layout shift (CLS)

## Priority
Medium

## Labels
`enhancement`, `ui/ux`, `animation`, `scroll`, `performance`

## Estimated Effort
5-7 hours

## Performance Considerations
- Use `requestAnimationFrame` for scroll handlers
- Debounce/throttle scroll events if needed
- Use CSS transforms for animations (GPU accelerated)
- Avoid animating expensive properties (width, height)
- Test with Lighthouse for performance impact

## Optional Enhancements
- Scroll snap for sections
- Horizontal scroll sections
- Mouse parallax (elements follow cursor)
- Scroll-driven animations (CSS scroll timeline)
- GSAP integration for advanced animations

## Resources
- [MDN: Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [Web.dev: Scroll-driven Animations](https://web.dev/scroll-driven-animations/)
- [CSS-Tricks: Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/)
- [AOS (Animate On Scroll)](https://github.com/michalsnik/aos)
