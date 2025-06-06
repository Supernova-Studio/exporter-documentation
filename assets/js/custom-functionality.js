/**
 * POC: Custom theme switcher
 * 
 * This module provides a custom dark/light theme switching solution with:
 * - Automatic system preference detection
 * - User preference persistence via localStorage
 * - Smooth visual transitions without flicker
 * - Full keyboard accessibility
 * - Real-time system theme change detection
 * 
 * Related files:
 * - src/custom_blocks/header_theme_switcher.pr - The theme switcher block, imported in page_body_strucure_header.pr
 * - scss/custom/theme-switcher.scss - The theme switcher styles
 * - dark-mode.css - The dark mode overrides for CSS custom properties/variables
 * 
 */
(function() {
  'use strict';

  // Configuration constants for theme management
  const THEME_KEY = 'preferred-theme';  // localStorage key for user preference
  const DARK_THEME_CLASS = 'dark';      // CSS class applied to body for dark theme
  const LIGHT_THEME = 'light';          // Theme identifier for light mode
  const DARK_THEME = 'dark';            // Theme identifier for dark mode

  /**
   * Determines the current theme preference
   * Priority order: 1) User's stored preference, 2) System preference, 3) Light theme default
   * 
   * @returns {string} Either 'light' or 'dark'
   */
  function getCurrentTheme() {
    // First, check if user has manually set a preference
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme) {
      return storedTheme;
    }
    
    // Fall back to system preference if available
    // This respects the user's OS-level dark/light mode setting
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    
    // Default to light theme if no preference is found
    return LIGHT_THEME;
  }

  /**
   * Applies the selected theme to the page
   * 
   * Includes transition management to prevent visual flicker
   * 
   * The flicker problem occurs because when switching themes, multiple DOM elements
   * change their styles simultaneously (background colors, text colors, borders, etc.).
   * If these changes happen with transitions enabled, users see a brief "flash" of
   * mixed styles as elements transition at slightly different speeds.
   * 
   * The solution:
   * 1. Disable all transitions temporarily
   * 2. Apply all theme changes instantly
   * 3. Re-enable transitions after changes are complete
   * 
   * @param {string} theme - Either 'light' or 'dark'
   */
  function applyTheme(theme) {
    const body = document.body;
    const switcher = document.querySelector('.theme-switcher');
    
    // Disable transitions before making any theme changes
    // This prevents the visual flicker that occurs when multiple elements
    // change styles simultaneously. The 'disable-transitions' class
    // temporarily overrides all CSS transitions with 0s duration.
    body.classList.add('disable-transitions');
    
    // Apply theme-specific changes
    if (theme === DARK_THEME) {
      // Add dark theme class to trigger CSS dark mode styles
      body.classList.add(DARK_THEME_CLASS);
      
      // Update theme switcher button state and accessibility attributes
      if (switcher) {
        switcher.setAttribute('data-theme', DARK_THEME);
        // Update ARIA labels for screen readers - important for accessibility
        switcher.setAttribute('aria-label', 'Switch to light mode');
        switcher.setAttribute('title', 'Switch to light mode');
      }
    } else {
      // Remove dark theme class to revert to light mode styles
      body.classList.remove(DARK_THEME_CLASS);
      
      // Update theme switcher for light mode
      if (switcher) {
        switcher.setAttribute('data-theme', LIGHT_THEME);
        // Update accessibility attributes for current state
        switcher.setAttribute('aria-label', 'Switch to dark mode');
        switcher.setAttribute('title', 'Switch to dark mode');
      }
    }
    
    // Persist user's choice for future visits
    // This ensures the theme preference survives browser restarts
    localStorage.setItem(THEME_KEY, theme);
    
    // Re-enable transitions after a brief delay
    // The 50ms delay ensures all DOM updates are complete before
    // transitions are restored. This timing is important:
    // - Too short: Transitions might interfere with theme application
    // - Too long: User notices the delay in smooth interactions
    setTimeout(() => {
      body.classList.remove('disable-transitions');
    }, 50);
  }

  /**
   * Toggles between light and dark themes
   * This is the main function called when user clicks the theme switcher
   */
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
  }

  /**
   * Initializes the theme when the page loads
   * This ensures the correct theme is applied immediately on page load,
   * preventing a flash of incorrect theme
   */
  function initializeTheme() {
    const currentTheme = getCurrentTheme();
    applyTheme(currentTheme);
  }

  /**
   * Monitors system theme changes and responds automatically
   * 
   * This feature detects when the user changes their OS-level theme preference
   * (e.g., from System Preferences on macOS or Settings on Windows) and
   * automatically updates the page theme ONLY if the user hasn't manually
   * set a preference.
   * 
   * This respects user intent: manual choices override automatic detection.
   */
  function watchSystemTheme() {
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      // Listen for changes in system theme preference
      mediaQuery.addEventListener('change', function(e) {
        // Only auto-update if user hasn't manually set a preference
        // This prevents overriding deliberate user choices
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }

  /**
   * Sets up all event listeners for theme switcher interaction
   * Handles both mouse clicks and keyboard navigation for full accessibility
   */
  function setupEventListeners() {
    // Handle mouse clicks on theme switcher
    // Using event delegation for better performance and reliability
    document.addEventListener('click', function(e) {
      if (e.target.closest('.theme-switcher')) {
        e.preventDefault(); // Prevent any default button behavior
        toggleTheme();
      }
    });

    // Handle keyboard navigation - essential for accessibility
    // Supports both Enter and Space keys as per web accessibility standards
    document.addEventListener('keydown', function(e) {
      const switcher = e.target.closest('.theme-switcher');
      if (switcher && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault(); // Prevent page scrolling on Space key
        toggleTheme();
      }
    });
  }

  /**
   * Main initialization function
   * Handles both immediate execution and delayed execution based on DOM state
   * 
   * This ensures the theme switcher works regardless of when this script loads:
   * - If DOM is still loading: wait for DOMContentLoaded
   * - If DOM is ready: initialize immediately
   */
  function init() {
    if (document.readyState === 'loading') {
      // DOM is still loading, wait for it to be ready
      document.addEventListener('DOMContentLoaded', function() {
        initializeTheme();    // Apply correct theme immediately
        setupEventListeners(); // Enable user interaction
        watchSystemTheme();   // Start monitoring system changes
      });
    } else {
      // DOM is already ready, initialize immediately
      initializeTheme();
      setupEventListeners();
      watchSystemTheme();
    }
  }

  // Start the theme switcher system
  init();

  // Expose toggleTheme function globally for programmatic access
  // This allows other scripts or console commands to trigger theme changes
  // Example usage: window.toggleTheme() in browser console
  window.toggleTheme = toggleTheme;

})();
