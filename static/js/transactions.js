/**
 * TRANSACTIONS JS
 */

const Transactions = {
    allData: [],

    init: async () => {
        Transactions.allData = await DataStore.getTransactions();
        Transactions.render(Transactions.allData);
        Transactions.setupFilters();
    },

    setupFilters: () => {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const methodFilter = document.getElementById('methodFilter');

        const applyFilters = () => {
            const query = searchInput.value.toLowerCase();
            const cat = categoryFilter.value;
            const method = methodFilter.value;

            const filtered = Transactions.allData.filter(t => {
                const matchesSearch = t.merchant.toLowerCase().includes(query) ||
                    t.amount.toString().includes(query);
                const matchesCat = cat === 'all' || t.category === cat;
                const matchesMethod = method === 'all' || t.paymentMethod === method;

                return matchesSearch && matchesCat && matchesMethod;
            });

            Transactions.render(filtered);
        };

        searchInput.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
        methodFilter.addEventListener('change', applyFilters);
    },

    render: (data) => {
        const list = document.getElementById('transactionList');
        const count = document.getElementById('showingCount');
        const total = document.getElementById('totalCount');

        count.textContent = data.length;
        total.textContent = Transactions.allData.length;

        if (data.length === 0) {
            list.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                        No transactions found
                    </td>
                </tr>
            `;
            return;
        }

        list.innerHTML = data.map(t => {
            const isDebit = t.type === 'debit';

            // Payment Detail String
            let detail = t.paymentMethod;
            if (t.cardLast4) detail += ` •••• ${t.cardLast4}`;
            if (t.upiApp) detail += ` (${t.upiApp})`;
            if (t.bank) detail += ` - ${t.bank}`;

            return `
                <tr>
                    <td class="text-sm text-secondary">${App.formatDate(t.date)}</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <div class="t-icon" style="width: 28px; height: 28px; font-size: 0.8rem;">
                                <i class="fas ${t.icon}"></i>
                            </div>
                            <span class="font-medium">${t.merchant}</span>
                        </div>
                    </td>
                    <td>
                        <span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-secondary); font-weight: 500;">
                            ${t.category}
                        </span>
                    </td>
                    <td class="text-sm text-muted">${detail}</td>
                    <td style="text-align: right;">
                        <span class="font-bold ${isDebit ? '' : 'text-success'}">
                            ${isDebit ? '-' : '+'} ${App.formatCurrency(t.amount)}
                        </span>
                    </td>
                    <td style="text-align: center;">
                        <span class="status-badge status-completed">Success</span>
                    </td>
                </tr>
            `;
        }).join('');
    }
};

document.addEventListener('DOMContentLoaded', Transactions.init);
