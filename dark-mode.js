// Dark Mode Toggle Implementation
(function() {
  'use strict';

  // Check for saved user preference, if none, check browser preference
  var initializeDarkMode = function() {
    var darkModePreference = localStorage.getItem('darkMode');
    var darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (darkModePreference === 'enabled') {
      enableDarkMode();
    } else if (darkModePreference === null && darkSchemeMediaQuery.matches) {
      enableDarkMode();
    }
  };

  // Enable dark mode
  var enableDarkMode = function() {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    updateToggleButton(true);
  };

  // Disable dark mode
  var disableDarkMode = function() {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    updateToggleButton(false);
  };

  // Update toggle button appearance
  var updateToggleButton = function(isDark) {
    var toggleButton = document.getElementById('darkModeToggle');
    if (toggleButton) {
      toggleButton.innerHTML = isDark ? '&#x2600;&#xFE0F;' : '&#x1F319;';
      toggleButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  };

  // Create and add toggle button to the page
  var createToggleButton = function() {
    var button = document.createElement('button');
    button.id = 'darkModeToggle';
    button.className = 'dark-mode-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.innerHTML = '&#x1F319;';

    button.addEventListener('click', function() {
      var isDarkMode = document.body.classList.contains('dark-mode');
      if (isDarkMode) {
        disableDarkMode();
      } else {
        enableDarkMode();
      }
    });

    document.body.appendChild(button);
  };

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    createToggleButton();
    initializeDarkMode();
  });

  // Listen for system theme changes
  var darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  var systemThemeChangeHandler = function(e) {
    var darkModePreference = localStorage.getItem('darkMode');
    // Only auto-switch if user hasn't manually set a preference
    if (darkModePreference === null) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  };
  // Use addListener for broader browser compatibility (including IE11)
  if (darkSchemeMediaQuery.addEventListener) {
    darkSchemeMediaQuery.addEventListener('change', systemThemeChangeHandler);
  } else if (darkSchemeMediaQuery.addListener) {
    darkSchemeMediaQuery.addListener(systemThemeChangeHandler);
  }
})();
