# Issue: Implement Dark Mode for Website

## Title
Add Dark Mode Toggle Feature

## Description
Implement a dark mode toggle for the website to improve user experience and reduce eye strain in low-light environments. This feature should allow users to switch between light and dark themes, with their preference stored in localStorage for persistence across sessions.

## Current State
The website currently uses a light theme with:
- White/light gray backgrounds
- Dark text (#5a5a5a)
- Bootstrap's default inverse navbar
- Bootstrap carousel with light backgrounds

## Proposed Implementation

### 1. UI Components Required

#### Toggle Button
- Add a dark mode toggle button in the navbar
- Position: Top-right corner next to existing nav items
- Icon: Moon icon (🌙) for light mode, Sun icon (☀️) for dark mode
- Should be accessible and keyboard-navigable

### 2. CSS Changes

#### Create `dark-mode.css` file with the following color scheme:

```css
/* Dark Mode Variables */
:root {
  --bg-primary-light: #ffffff;
  --bg-primary-dark: #1a1a1a;
  --bg-secondary-light: #f9f9f9;
  --bg-secondary-dark: #2d2d2d;
  --text-primary-light: #5a5a5a;
  --text-primary-dark: #e0e0e0;
  --text-secondary-light: #333333;
  --text-secondary-dark: #b0b0b0;
  --navbar-bg-dark: #1f1f1f;
  --carousel-overlay-dark: rgba(0, 0, 0, 0.85);
}

/* Dark Mode Styles */
body.dark-mode {
  background-color: var(--bg-primary-dark);
  color: var(--text-primary-dark);
}

body.dark-mode .navbar-inverse {
  background-color: var(--navbar-bg-dark);
  border-color: #333;
}

body.dark-mode .carousel-caption {
  background-color: var(--carousel-overlay-dark);
  border-radius: 8px;
  padding: 20px;
}

body.dark-mode .marketing h2,
body.dark-mode .featurette h2 {
  color: var(--text-primary-dark);
}

body.dark-mode .marketing p,
body.dark-mode .featurette p {
  color: var(--text-secondary-dark);
}

body.dark-mode footer {
  background-color: var(--bg-secondary-dark);
  color: var(--text-secondary-dark);
}

body.dark-mode .btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

body.dark-mode .btn-primary:hover {
  background-color: #0a58ca;
  border-color: #0a58ca;
}

/* Toggle Button Styles */
.dark-mode-toggle {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
  background: transparent;
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  font-size: 24px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dark-mode-toggle:hover {
  transform: scale(1.1);
  border-color: #888;
}

body.dark-mode .dark-mode-toggle {
  border-color: #555;
}

/* Smooth transitions */
body,
.navbar-inverse,
.carousel-caption,
.marketing h2,
.marketing p,
footer {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### 3. JavaScript Implementation

#### Create `dark-mode.js` file:

```javascript
// Dark Mode Toggle Implementation
(function() {
  'use strict';

  // Check for saved user preference, if none, check browser preference
  const initializeDarkMode = () => {
    const darkModePreference = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModePreference === 'enabled') {
      enableDarkMode();
    } else if (darkModePreference === null && prefersDarkScheme.matches) {
      enableDarkMode();
    }
  };

  // Enable dark mode
  const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    updateToggleButton(true);
  };

  // Disable dark mode
  const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    updateToggleButton(false);
  };

  // Update toggle button appearance
  const updateToggleButton = (isDark) => {
    const toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
      toggleButton.innerHTML = isDark ? '☀️' : '🌙';
      toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // Create and add toggle button to the page
  const createToggleButton = () => {
    const button = document.createElement('button');
    button.id = 'darkModeToggle';
    button.className = 'dark-mode-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.innerHTML = '🌙';
    
    button.addEventListener('click', () => {
      const isDarkMode = document.body.classList.contains('dark-mode');
      if (isDarkMode) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });

    document.body.appendChild(button);
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    createToggleButton();
    initializeDarkMode();
  });

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const darkModePreference = localStorage.getItem('darkMode');
    // Only auto-switch if user hasn't manually set a preference
    if (darkModePreference === null) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
})();
```

### 4. HTML Changes

Add to `index.html` in the `<head>` section (after existing CSS links):
```html
<!-- Dark Mode Support -->
<link href="dark-mode.css" rel="stylesheet">
```

Add before closing `</body>` tag (after existing scripts):
```html
<!-- Dark Mode Toggle -->
<script src="dark-mode.js"></script>
```

## Files to Create/Modify

### New Files:
1. `dark-mode.css` - All dark mode styles
2. `dark-mode.js` - Toggle functionality and localStorage management

### Modified Files:
1. `index.html` - Add links to new CSS and JS files

## Acceptance Criteria

- [ ] Users can toggle between light and dark modes using a visible button
- [ ] Dark mode preference persists across page reloads using localStorage
- [ ] Dark mode respects system preference on first visit (if no saved preference)
- [ ] Toggle button is accessible (keyboard navigable, has proper ARIA labels)
- [ ] All text remains readable in both modes (proper contrast ratios)
- [ ] Smooth transitions between themes (no jarring color changes)
- [ ] Button has hover effects for better UX
- [ ] Works across all major browsers (Chrome, Firefox, Safari, Edge)
- [ ] Responsive and works on mobile devices
- [ ] No layout shifts when toggling themes

## Testing Checklist

- [ ] Test toggle button functionality
- [ ] Verify localStorage persistence (refresh page, close/reopen browser)
- [ ] Test with system dark mode preference enabled/disabled
- [ ] Check all page sections in both modes (navbar, carousel, content, footer)
- [ ] Verify button links remain visible and clickable in both modes
- [ ] Test keyboard navigation (Tab to button, Enter/Space to toggle)
- [ ] Test on mobile/tablet viewports
- [ ] Validate WCAG color contrast ratios for accessibility

## Priority
Medium

## Labels
`enhancement`, `ui/ux`, `accessibility`, `good-first-issue`

## Estimated Effort
3-4 hours

## Additional Notes

- Consider using CSS custom properties (CSS variables) for easier theme management
- The implementation respects the user's system preference by default
- localStorage ensures the preference persists across sessions
- The toggle button is fixed position for easy access from any scroll position
- Future enhancement: Could add more theme options (e.g., high contrast, sepia)

## Resources

- [MDN: prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [Web.dev: Dark Mode Best Practices](https://web.dev/prefers-color-scheme/)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
