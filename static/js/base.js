/**
 * Expense Intelligence - Base Utilities
 */

const App = {
  // DOM Query Helper
  $: (selector) => document.querySelector(selector),
  $$: (selector) => document.querySelectorAll(selector),

  // Local Storage Wrapper
  store: {
    get: (key) => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return null;
      }
    },
    set: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => localStorage.removeItem(key)
  },

  // Simple Router / Navigation Check
  checkAuth: () => {
    const isLoggedIn = App.store.get('isLoggedIn');
    // Basic check

    // Logic:
    // If NOT logged in and NOT on login page -> Redirect to login
    // If logged in and ON login page -> Redirect to dashboard

    // Note: Since this is purely client-side and using file:// protocol often, 
    // we rely on the specific meta tags for reliability.

    // 1. If on protected page (not login) and NO auth -> Go to Index
    if (!isLoggedIn && !document.querySelector('meta[name="page-type"][content="login"]')) {
      window.location.replace('index.html'); // Use replace to prevent back-button loops
    }

    // 2. If on login page and HAS auth -> Go to Dashboard
    if (isLoggedIn && document.querySelector('meta[name="page-type"][content="login"]')) {
      window.location.replace('dashboard.html'); // Use replace
    }
  },

  logout: () => {
    App.store.remove('isLoggedIn');
    App.store.remove('userMobile');
    window.location.replace('index.html');
  }
};

// Initialize
// App.checkAuth(); // Commented out until we have other pages to prevent infinite loops during dev
