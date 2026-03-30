# Issue: Comprehensive Accessibility Improvements

## Title
Enhance Website Accessibility to WCAG 2.1 AA Standards

## Description
Implement comprehensive accessibility improvements to ensure the website is usable by everyone, including people with disabilities. Target WCAG 2.1 Level AA compliance with proper ARIA attributes, keyboard navigation, screen reader support, and color contrast.

## Current State
- Missing ARIA labels and landmarks
- No skip navigation link
- Insufficient color contrast in some areas
- No focus indicators for keyboard navigation
- Images missing alt text
- Form fields lack proper labels
- No screen reader announcements

## Proposed Implementation

### 1. Semantic HTML and ARIA Landmarks

```html
<!-- Add skip navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Proper semantic structure -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation content -->
  </nav>
</header>

<main id="main-content" role="main" aria-label="Main content">
  <!-- Main content sections -->
  
  <article role="article" aria-labelledby="feature-heading">
    <h2 id="feature-heading">Features</h2>
    <!-- Content -->
  </article>
  
  <section role="region" aria-labelledby="gallery-heading">
    <h2 id="gallery-heading">Gallery</h2>
    <!-- Gallery content -->
  </section>
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

### 2. Enhanced Keyboard Navigation

```css
/* accessibility.css */

/* Skip link for keyboard users */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 10000;
}

.skip-link:focus {
  top: 0;
}

/* Enhanced focus indicators */
*:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* Remove outline for mouse users only */
.user-is-tabbing *:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

:not(.user-is-tabbing) *:focus {
  outline: none;
}

/* Focus visible (modern approach) */
*:focus-visible {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* Ensure focus is visible on interactive elements */
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  *:focus {
    outline: 3px solid currentColor;
    outline-offset: 3px;
  }
}
```

```javascript
// keyboard-detection.js
// Detect keyboard usage for focus styling
(function() {
  let isTab = false;

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      isTab = true;
    }
  });

  window.addEventListener('mousedown', () => {
    if (isTab) {
      document.body.classList.remove('user-is-tabbing');
      isTab = false;
    }
  });
})();
```

### 3. Screen Reader Enhancements

```html
<!-- Descriptive aria-labels -->
<button aria-label="Close dialog" onclick="closeDialog()">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true" class="sr-only" id="status-message"></div>

<!-- Proper button labels -->
<button class="navbar-toggle" 
        aria-expanded="false" 
        aria-controls="navbar"
        aria-label="Toggle navigation">
  <span class="sr-only">Toggle navigation</span>
  <span class="icon-bar" aria-hidden="true"></span>
  <span class="icon-bar" aria-hidden="true"></span>
  <span class="icon-bar" aria-hidden="true"></span>
</button>

<!-- Carousel with proper ARIA -->
<div id="myCarousel" 
     class="carousel slide" 
     role="region" 
     aria-label="Featured content carousel"
     aria-roledescription="carousel">
  
  <div class="carousel-inner" role="list">
    <div class="item active" role="listitem" aria-label="Slide 1 of 3">
      <img src="..." alt="Azure App Service dashboard showing deployment options">
      <!-- ... -->
    </div>
  </div>
  
  <button class="carousel-control left" 
          aria-label="Previous slide"
          role="button">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
  </button>
  
  <button class="carousel-control right" 
          aria-label="Next slide"
          role="button">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
  </button>
  
  <!-- Indicators -->
  <ol class="carousel-indicators" role="tablist">
    <li data-target="#myCarousel" 
        data-slide-to="0" 
        class="active"
        role="tab"
        aria-label="Slide 1"
        aria-selected="true"></li>
    <!-- ... -->
  </ol>
</div>

<!-- Screen reader only class -->
<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only-focusable:active,
.sr-only-focusable:focus {
  position: static;
  width: auto;
  height: auto;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>
```

### 4. Color Contrast Fixes

```javascript
// contrast-checker.js
// Utility to check and fix color contrast issues
const contrastIssues = [
  { 
    selector: '.navbar-inverse .navbar-brand',
    background: '#222',
    foreground: '#777', // Fails WCAG AA
    fix: '#9d9d9d' // Passes WCAG AA
  },
  {
    selector: '.carousel-caption p',
    background: 'rgba(0,0,0,0.6)',
    foreground: '#ddd', // Borderline
    fix: '#ffffff' // Ensure AAA compliance
  }
];

// Apply fixes
contrastIssues.forEach(issue => {
  const elements = document.querySelectorAll(issue.selector);
  elements.forEach(el => {
    el.style.color = issue.fix;
  });
});
```

```css
/* High contrast color fixes */
.navbar-inverse .navbar-brand {
  color: #9d9d9d; /* Was #777 - now meets WCAG AA */
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.8); /* Increased opacity */
}

.carousel-caption p {
  color: #ffffff; /* Ensure maximum contrast */
}

.btn-primary {
  background-color: #0056b3; /* Darker blue for better contrast */
}

/* Ensure links are distinguishable */
a {
  text-decoration: underline;
  text-underline-offset: 2px;
}

a:hover,
a:focus {
  text-decoration-thickness: 2px;
}
```

### 5. Form Accessibility

```html
<!-- Accessible form with proper labels and error handling -->
<form id="contactForm" role="form" aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact Form</h2>
  
  <div class="form-group">
    <label for="name" class="required">
      Name
      <abbr title="required" aria-label="required">*</abbr>
    </label>
    <input type="text" 
           class="form-control" 
           id="name" 
           name="name"
           required
           aria-required="true"
           aria-invalid="false"
           aria-describedby="name-hint name-error">
    <small id="name-hint" class="form-text">
      Please enter your full name
    </small>
    <div id="name-error" class="error-message" role="alert" aria-live="polite"></div>
  </div>
  
  <div class="form-group">
    <label for="email" class="required">
      Email Address
      <abbr title="required" aria-label="required">*</abbr>
    </label>
    <input type="email" 
           class="form-control" 
           id="email"
           name="email"
           required
           aria-required="true"
           aria-invalid="false"
           aria-describedby="email-hint email-error"
           autocomplete="email">
    <small id="email-hint" class="form-text">
      We'll never share your email with anyone
    </small>
    <div id="email-error" class="error-message" role="alert" aria-live="polite"></div>
  </div>
  
  <button type="submit" class="btn btn-primary">
    Send Message
  </button>
</form>
```

### 6. Motion and Animation Controls

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  .carousel {
    /* Disable auto-rotation */
  }
}

/* Provide pause button for carousel */
.carousel-pause-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}
```

```javascript
// carousel-controls.js
// Add pause/play control for carousel
(function() {
  const carousel = document.getElementById('myCarousel');
  const pauseBtn = document.createElement('button');
  
  pauseBtn.className = 'carousel-pause-btn';
  pauseBtn.setAttribute('aria-label', 'Pause carousel');
  pauseBtn.innerHTML = '<span aria-hidden="true">⏸</span> Pause';
  
  let isPaused = false;
  
  pauseBtn.addEventListener('click', () => {
    if (isPaused) {
      $(carousel).carousel('cycle');
      pauseBtn.innerHTML = '<span aria-hidden="true">⏸</span> Pause';
      pauseBtn.setAttribute('aria-label', 'Pause carousel');
    } else {
      $(carousel).carousel('pause');
      pauseBtn.innerHTML = '<span aria-hidden="true">▶</span> Play';
      pauseBtn.setAttribute('aria-label', 'Play carousel');
    }
    isPaused = !isPaused;
  });
  
  carousel.appendChild(pauseBtn);
})();
```

### 7. Accessibility Testing Utilities

```javascript
// a11y-test.js
// Runtime accessibility checker
class AccessibilityTester {
  constructor() {
    this.issues = [];
  }

  checkImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        this.issues.push({
          element: img,
          issue: 'Image missing alt text',
          wcag: '1.1.1 Non-text Content'
        });
      }
    });
  }

  checkHeadingHierarchy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let prevLevel = 0;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      if (level - prevLevel > 1) {
        this.issues.push({
          element: heading,
          issue: `Heading level ${level} follows ${prevLevel} (skipped level)`,
          wcag: '1.3.1 Info and Relationships'
        });
      }
      prevLevel = level;
    });
  }

  checkFormLabels() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label && !input.getAttribute('aria-label')) {
        this.issues.push({
          element: input,
          issue: 'Form control missing label',
          wcag: '3.3.2 Labels or Instructions'
        });
      }
    });
  }

  checkColorContrast() {
    // This would require color contrast calculation
    // Use axe-core library for comprehensive checking
    console.log('Run axe-core for contrast checking');
  }

  runAllChecks() {
    this.checkImages();
    this.checkHeadingHierarchy();
    this.checkFormLabels();
    this.checkColorContrast();
    
    console.table(this.issues);
    return this.issues;
  }
}

// Run in development
if (window.location.hostname === 'localhost') {
  const tester = new AccessibilityTester();
  window.addEventListener('load', () => tester.runAllChecks());
}
```

## Files to Create/Modify

### New Files:
1. `accessibility.css` - All accessibility styles
2. `keyboard-detection.js` - Keyboard usage detection
3. `carousel-controls.js` - Accessible carousel controls
4. `a11y-test.js` - Development accessibility checker

### Modified Files:
1. `index.html` - Add ARIA attributes, semantic HTML, skip link
2. `carousel.css` - Fix color contrast issues
3. All forms - Add proper labels and ARIA attributes

## Acceptance Criteria

- [ ] WCAG 2.1 Level AA compliant
- [ ] All images have descriptive alt text
- [ ] Proper heading hierarchy (no skipped levels)
- [ ] Skip navigation link for keyboard users
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible and clear
- [ ] Color contrast ratios meet WCAG AA (4.5:1 for text)
- [ ] Form fields have associated labels
- [ ] ARIA landmarks properly implemented
- [ ] Screen reader announces all important content
- [ ] Carousel can be paused
- [ ] Respects prefers-reduced-motion
- [ ] No keyboard traps
- [ ] Error messages announced to screen readers

## Testing Checklist

- [ ] Test with NVDA screen reader (Windows)
- [ ] Test with JAWS screen reader (Windows)
- [ ] Test with VoiceOver (Mac/iOS)
- [ ] Test with TalkBack (Android)
- [ ] Keyboard-only navigation test
- [ ] Run axe DevTools audit
- [ ] Run Lighthouse accessibility audit (score 100)
- [ ] Run WAVE accessibility checker
- [ ] Test with Windows High Contrast mode
- [ ] Test with browser zoom at 200%
- [ ] Verify color contrast with tools
- [ ] Test form validation announcements

## Priority
High

## Labels
`accessibility`, `a11y`, `wcag`, `screen-reader`, `keyboard-navigation`

## Estimated Effort
10-12 hours

## Success Metrics
- Lighthouse Accessibility score: 100
- axe DevTools: 0 violations
- WAVE: 0 errors
- Screen reader: All content accessible
- Keyboard: All functionality accessible

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN: Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM: Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
