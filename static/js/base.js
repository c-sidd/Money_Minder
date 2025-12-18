/**
 * BASE JS
 * Common UI logic
 */

const App = {
    init: () => {
        App.renderSidebar();
        App.setupEventListeners();
    },

    renderSidebar: () => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return; // Login page might not have sidebar

        const currentPage = window.location.pathname.split('/').pop();

        sidebar.innerHTML = `
            <div class="sidebar-header">
                <div class="logo-icon"><i class="fas fa-wallet"></i></div>
                <h2 class="text-xl font-bold">Money Minder</h2>
            </div>
            
            <nav class="nav-links">
                <a href="dashboard.html" class="nav-item ${currentPage === 'dashboard.html' ? 'active' : ''}">
                    <i class="fas fa-th-large"></i> Dashboard
                </a>
                <a href="transactions.html" class="nav-item ${currentPage === 'transactions.html' ? 'active' : ''}">
                    <i class="fas fa-list"></i> Transactions
                </a>
                <a href="cards.html" class="nav-item ${currentPage === 'cards.html' ? 'active' : ''}">
                    <i class="fas fa-credit-card"></i> Cards
                </a>
                <a href="fixed-expenses.html" class="nav-item ${currentPage === 'fixed-expenses.html' ? 'active' : ''}">
                    <i class="fas fa-file-invoice-dollar"></i> Fixed Expenses
                </a>
                <a href="debts.html" class="nav-item ${currentPage === 'debts.html' ? 'active' : ''}">
                    <i class="fas fa-hand-holding-usd"></i> Debts
                </a>
                <a href="reports.html" class="nav-item ${currentPage === 'reports.html' ? 'active' : ''}">
                    <i class="fas fa-chart-pie"></i> Reports
                </a>
                <a href="settings.html" class="nav-item ${currentPage === 'settings.html' ? 'active' : ''}">
                    <i class="fas fa-cog"></i> Settings
                </a>
            </nav>

            <div class="user-profile">
                <div class="avatar">
                    <img src="${DataStore.user.avatar}" alt="User">
                </div>
                <div class="flex-col">
                    <span class="text-sm font-bold">${DataStore.user.name}</span>
                    <span class="text-xs text-secondary" style="cursor: pointer;" onclick="Auth.logout()">Log Out</span>
                </div>
            </div>
        `;
    },

    setupEventListeners: () => {
        // Mobile toggle logic if exists
        const toggleBtn = document.getElementById('sidebar-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.getElementById('sidebar').classList.toggle('open');
            });
        }
    },

    // Utility to format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    },

    // Utility to format date
    formatDate: (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    }
};

// Check if DataStore is ready before init
if (typeof DataStore !== 'undefined') {
    // Wait for DOM
    document.addEventListener('DOMContentLoaded', App.init);
}
