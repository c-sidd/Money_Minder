/**
 * Dashboard Logic - Expense Intelligence
 */

document.addEventListener('DOMContentLoaded', () => {
    App.checkAuth();

    // Initialize Dashboard
    updateGreeting();
    loadDashboardData();

    // Setup Interaction Listeners
    setupInteractions();
});

function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('time-greeting');
    const monthEl = document.getElementById('current-month');

    let text = 'Good evening';
    if (hour < 5) text = 'Late night check-in';
    else if (hour < 12) text = 'Good morning';
    else if (hour < 18) text = 'Good afternoon';

    greetingEl.textContent = text;

    const options = { month: 'long', year: 'numeric' };
    monthEl.textContent = new Date().toLocaleDateString('en-IN', options);
}

function loadDashboardData() {
    // 1. Rich Mock Data - The "Intelligence" Source
    const financialData = {
        monthlyIncome: 125000,
        fixedCommitments: 45000, // Rent, SIPs, EMIs
        spentSoFar: 28450,

        // Subscription Detection
        upcomingPayments: [
            { name: 'Netflix Premium', amount: 649, due: 'Tomorrow', icon: '🎬' },
            { name: 'HDFC Credit Card', amount: 12400, due: 'in 3 days', icon: '💳' }
        ],

        // Rich Transaction History
        transactions: [
            {
                id: "tx_1",
                merchant: "Uber",
                category: "Transport",
                amount: 240,
                type: "debit",
                method: "UPI",
                upi_app: "Google Pay",
                bank: "HDFC Bank XX89",
                timestamp: "Today, 10:23 AM",
                source: "SMS",
                icon: "🚕"
            },
            {
                id: "tx_2",
                merchant: "Starbucks",
                category: "Dining",
                amount: 350,
                type: "debit",
                method: "UPI",
                upi_app: "PhonePe",
                bank: "HDFC Bank XX89",
                timestamp: "Today, 8:45 AM",
                source: "SMS",
                icon: "☕"
            },
            {
                id: "tx_3",
                merchant: "Spotify",
                category: "Subscription",
                amount: 119,
                type: "debit",
                method: "Card",
                bank: "ICICI Credit Card",
                timestamp: "Yesterday, 4:00 PM",
                source: "Email",
                icon: "🎵"
            },
            {
                id: "tx_4",
                merchant: "Salary",
                category: "Income",
                amount: 85000, // Partial salary
                type: "credit",
                method: "Bank Transfer",
                bank: "HDFC Bank XX89",
                timestamp: "1st Sep",
                source: "Bank",
                icon: "💰"
            }
        ]
    };

    // 2. Logic: Calculate "Safe to Spend"
    // Formula: Income - (Fixed Commitments + Saved Constraints + Spent Today)
    // Note: We simulate a dynamic calculation here
    const safeToSpend = financialData.monthlyIncome - financialData.fixedCommitments - financialData.spentSoFar;

    // Simulate Network Delay
    setTimeout(() => {
        renderSafeSpend(safeToSpend);
        renderTransactions(financialData.transactions);
        renderUpcoming(financialData.upcomingPayments);
        renderMonthlyProgress(financialData.spentSoFar, financialData.monthlyIncome);
    }, 600);
}

function renderSafeSpend(amount) {
    const el = document.getElementById('safe-spend-amount');

    // Animation Count-up effect
    let start = 0;
    const end = amount;
    const duration = 1000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth effect
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentAmount = Math.floor(start + (end - start) * easeOutQuart);
        el.textContent = currentAmount.toLocaleString('en-IN'); // Indian Number Format

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function renderTransactions(list) {
    const container = document.getElementById('transaction-list');
    container.innerHTML = '';

    list.forEach(tx => {
        const div = document.createElement('div');
        div.className = 'transaction-item fade-in';

        const isIncome = tx.type === 'credit';
        const amountClass = isIncome ? 't-amount income' : 't-amount';
        const sign = isIncome ? '+' : '';

        // Conditional Badge for Source
        const sourceBadge = `<span class="source-badge ${tx.source.toLowerCase()}">${tx.source}</span>`;

        // Detailed Subtext (e.g., "via GPay • HDFC")
        const methodDetail = tx.upi_app ? `via ${tx.upi_app}` : tx.method;

        div.innerHTML = `
            <div class="t-main-row" onclick="toggleDetails('${tx.id}')">
                <div class="t-left">
                    <div class="t-icon">${tx.icon}</div>
                    <div class="t-info">
                        <div class="t-header">
                            <span class="t-merchant">${tx.merchant}</span>
                            ${sourceBadge}
                        </div>
                        <span class="t-meta">${tx.timestamp} • ${tx.category}</span>
                    </div>
                </div>
                <div class="${amountClass}">${sign}₹${tx.amount.toLocaleString('en-IN')}</div>
            </div>
            
            <!-- Expanded Details (Hidden by default) -->
            <div id="details-${tx.id}" class="t-details hidden">
                <div class="detail-grid">
                    <div class="d-item">
                        <span class="d-label">Payment Mode</span>
                        <span class="d-value">${methodDetail}</span>
                    </div>
                    <div class="d-item">
                        <span class="d-label">Bank Info</span>
                        <span class="d-value">${tx.bank}</span>
                    </div>
                    <div class="d-item full">
                        <span class="d-label">Original Source</span>
                        <span class="d-value mono">"Debited INR ${tx.amount}.00 from A/c... via ${tx.method}"</span>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(div);
    });
}

function renderUpcoming(list) {
    const container = document.getElementById('upcoming-list');
    if (!container) return; // Guard clause

    container.innerHTML = '';

    list.forEach(item => {
        const el = document.createElement('div');
        el.className = 'upcoming-item';
        el.innerHTML = `
            <div class="u-icon">${item.icon}</div>
            <div class="u-info">
                <span class="u-name">${item.name}</span>
                <span class="u-due">Due ${item.due}</span>
            </div>
            <div class="u-amount">₹${item.amount.toLocaleString('en-IN')}</div>
        `;
        container.appendChild(el);
    });
}

function renderMonthlyProgress(spent, income) {
    const percent = Math.min((spent / income) * 100, 100);
    const bar = document.getElementById('monthly-progress-bar');
    if (bar) bar.style.width = `${percent}%`;

    const text = document.getElementById('monthly-spend-text');
    if (text) text.textContent = `₹${spent.toLocaleString('en-IN')} spent this month`;
}

// Global scope for onclick handler
window.toggleDetails = (id) => {
    const el = document.getElementById(`details-${id}`);
    const row = el.previousElementSibling; // The main row

    el.classList.toggle('hidden');
    row.classList.toggle('expanded');
};

function setupInteractions() {
    // Other click handlers if needed
}
