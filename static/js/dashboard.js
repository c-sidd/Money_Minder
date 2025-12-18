/**
 * DASHBOARD JS
 * Logic for the dashboard page
 */

const Dashboard = {
    init: async () => {
        // Wait for data simulation if needed (though we access synchronous props)
        await Dashboard.renderStats();
        Dashboard.renderRecentTransactions();
        Dashboard.renderCards();
        Dashboard.renderUpcomingBills();

        // Update user name
        const user = DataStore.user;
        if (user) {
            document.getElementById('userName').textContent = user.name.split(' ')[0];
        }
    },

    renderStats: () => {
        // Calculate Totals
        const accounts = DataStore.accounts;
        const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

        // Calculate Monthly Income/Expense (Mock logic: Filter by current month)
        const currentMonth = new Date().getMonth();
        const transactions = DataStore.transactions;

        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            if (tDate.getMonth() === currentMonth || true) { // Using all data for demo since mock data is small
                if (t.category === 'Income') {
                    income += t.amount;
                } else {
                    expense += t.amount;
                }
            }
        });

        // Update DOM
        document.getElementById('totalBalance').textContent = App.formatCurrency(totalBalance);
        document.getElementById('monthlyIncome').textContent = App.formatCurrency(income);
        document.getElementById('monthlyExpenses').textContent = App.formatCurrency(expense);
        document.getElementById('netSavings').textContent = App.formatCurrency(income - expense);
    },

    renderRecentTransactions: () => {
        const list = document.getElementById('recentTransactionsList');
        const transactions = DataStore.transactions.slice(0, 5); // Take first 5

        list.innerHTML = transactions.map(t => {
            const isDebit = t.type === 'debit';
            const colorClass = isDebit ? 'text-primary' : 'text-success'; // Using generic White or Success
            // Actually, let's use standard colors: Income = Green, Expense = White or Muted

            return `
                <tr>
                    <td>
                        <div class="t-info">
                            <div class="t-icon">
                                <i class="fas ${t.icon || 'fa-circle'}"></i>
                            </div>
                            <div>
                                <div class="font-medium">${t.merchant}</div>
                                <div class="text-xs text-secondary">${t.category}</div>
                            </div>
                        </div>
                    </td>
                    <td class="text-sm text-secondary">${App.formatDate(t.date)}</td>
                    <td class="text-sm text-secondary">${t.paymentMethod}</td>
                    <td style="text-align: right;">
                        <span class="font-bold ${isDebit ? '' : 'text-success'}">
                            ${isDebit ? '-' : '+'} ${App.formatCurrency(t.amount)}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');
    },

    renderCards: () => {
        const container = document.getElementById('cardsPreview');
        const cards = DataStore.cards.slice(0, 2); // Show top 2

        container.innerHTML = cards.map(c => {
            const bg = c.type === 'credit'
                ? 'linear-gradient(135deg, #1f4037, #99f2c8)' // Credit Gradient
                : 'linear-gradient(135deg, #3a1c71, #d76d77)'; // Debit Gradient

            // Override with mock colors for variation
            const style = c.bank.includes('HDFC')
                ? 'background: linear-gradient(135deg, #00416A, #E4E5E6);'
                : 'background: linear-gradient(135deg, #8E0E00, #1F1C18);';

            return `
                <div class="mini-card" style="${style}">
                    <div class="mini-card-bank">
                        <span>${c.bank}</span>
                        <span>${c.type.toUpperCase()}</span>
                    </div>
                    <div class="mini-card-num">**** **** **** ${c.last4Digits}</div>
                    <div class="mini-card-footer">
                        <span>${c.holder}</span>
                        <span>EXP: ${c.expiry}</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderUpcomingBills: () => {
        const container = document.getElementById('upcomingBillsList');
        const validBills = DataStore.fixedExpenses.slice(0, 3);

        container.innerHTML = validBills.map(b => `
            <div class="bill-item">
                <div class="bill-date">
                    <span class="bill-day">${b.dueDate.replace(/\D/g, '')}</span>
                </div>
                <div class="flex-col flex-1">
                    <span class="font-medium text-sm">${b.name}</span>
                    <span class="text-xs text-secondary">${b.frequency}</span>
                </div>
                <div class="font-bold text-sm">
                    ${App.formatCurrency(b.amount)}
                </div>
            </div>
        `).join('');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', Dashboard.init);
