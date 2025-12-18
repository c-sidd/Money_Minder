/**
 * Login Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Note: checkAuth() in base.js handles redirection if ALREADY logged in.
    App.checkAuth();

    const form = App.$('#login-form');
    const mobileInput = App.$('#mobile');
    const loginBtn = App.$('#login-btn');
    const btnText = App.$('.btn-text');
    const spinner = App.$('.spinner');
    const errorMsg = App.$('#error-msg');

    // Simple formatted input (optional enhancement can go here)
    mobileInput.addEventListener('input', (e) => {
        // Remove non-numeric chars
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);

        // Hide error on type
        if (!errorMsg.classList.contains('visually-hidden')) {
            errorMsg.classList.add('visually-hidden');
            mobileInput.style.borderColor = '';
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const mobile = mobileInput.value.trim();

        // Validation: 10 digits
        if (mobile.length !== 10) {
            showError('Please enter a valid 10-digit mobile number');
            return;
        }

        // Start Loading State
        setLoading(true);

        // Simulate API verification delay (1.5s)
        setTimeout(() => {
            // Success
            loginSuccess(mobile);
        }, 1500);
    });

    function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove('visually-hidden');
        mobileInput.style.borderColor = 'var(--color-accent-error)';
        mobileInput.focus();
    }

    function setLoading(isLoading) {
        if (isLoading) {
            loginBtn.disabled = true;
            btnText.classList.add('visually-hidden');
            spinner.classList.remove('visually-hidden');
            mobileInput.disabled = true;
        } else {
            loginBtn.disabled = false;
            btnText.classList.remove('visually-hidden');
            spinner.classList.add('visually-hidden');
            mobileInput.disabled = false;
        }
    }
});
