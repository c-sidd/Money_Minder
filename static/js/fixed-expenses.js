/**
 * FIXED EXPENSES JS
 */

const FixedExpenses = {
    init: async () => {
        FixedExpenses.renderList();
        FixedExpenses.renderStats();
    },

    renderList: () => {
        const list = document.getElementById('fixedExpensesList');

        list.innerHTML = DataStore.fixedExpenses.map(item => `
            <tr>
                <td class="font-medium">${item.name}</td>
                <td>
                     <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary); font-weight: 500;">
                        ${item.category}
                    </span>
                </td>
                <td class="text-secondary">${item.frequency}</td>
                <td class="text-warning">Due ${item.dueDate}</td>
                <td style="text-align: right;" class="font-bold">${App.formatCurrency(item.amount)}</td>
                <td style="text-align: center;">
                    <span class="auto-pay-badge ${item.autoPay ? 'ap-on' : 'ap-off'}">
                        ${item.autoPay ? 'ON' : 'OFF'}
                    </span>
                </td>
                <td>
                    <div class="flex justify-center gap-2">
                        <button class="action-btn" title="Edit"><i class="fas fa-pen"></i></button>
                        <button class="action-btn" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    },

    renderStats: () => {
        // Mock calculations
        const total = DataStore.fixedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        document.getElementById('monthlyTotal').textContent = App.formatCurrency(total);

        // Mock "Upcoming" (just taking 50% for demo)
        document.getElementById('upcomingTotal').textContent = App.formatCurrency(total * 0.5);
        document.getElementById('paidTotal').textContent = App.formatCurrency(total * 0.5);
    }
};

document.addEventListener('DOMContentLoaded', FixedExpenses.init);
