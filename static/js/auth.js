/**
 * AUTHENTICATION MODULE
 * Handles login check and redirects
 */

const Auth = {
    check: () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // If not logged in and not on login page, redirect to index
        if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
            window.location.href = 'index.html';
            return false;
        }

        // If logged in and on login page, redirect to dashboard
        if (isLoggedIn && (currentPage === 'index.html' || currentPage === '')) {
            window.location.href = 'dashboard.html';
            return true;
        }

        return isLoggedIn;
    },

    login: (email, password) => {
        // Mock login - accept anything
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    }
};

// Auto-check on load
Auth.check();
