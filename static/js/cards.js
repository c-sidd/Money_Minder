/**
 * CARDS JS
 */

const Cards = {
    init: async () => {
        Cards.renderCards();
        Cards.renderStatements();
    },

    renderCards: () => {
        const container = document.getElementById('cardsContainer');

        container.innerHTML = DataStore.cards.map(c => {
            const isCredit = c.type === 'credit';

            // Visual Styles based on bank/type
            let bgStyle = 'background: linear-gradient(135deg, #2c3e50, #000000)';
            if (c.bank.includes('HDFC')) bgStyle = 'background: linear-gradient(135deg, #00416A, #E4E5E6)';
            if (c.bank.includes('ICICI')) bgStyle = 'background: linear-gradient(135deg, #8E0E00, #1F1C18)';
            if (c.type === 'debit') bgStyle = 'background: linear-gradient(135deg, #1A2980, #26D0CE)';

            // Progress for credit cards
            let progressHtml = '';
            if (isCredit) {
                const percent = (c.usedAmount / c.creditLimit) * 100;
                progressHtml = `
                    <div style="margin-top: auto; padding-top: 1rem;">
                        <div class="flex justify-between text-xs mb-1" style="opacity: 0.9;">
                            <span>Used: ${App.formatCurrency(c.usedAmount)}</span>
                            <span>${Math.round(percent)}%</span>
                        </div>
                        <div class="usage-container">
                            <div class="usage-bar" style="width: ${percent}%;"></div>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="credit-card" style="${bgStyle}">
                    <div class="card-content">
                        <div class="card-top">
                            <div class="card-chip"></div>
                            <div class="card-type-icon">
                                <i class="fab fa-cc-${c.network || 'visa'}"></i>
                            </div>
                        </div>
                        
                        <div class="card-number">
                            **** **** **** ${c.last4Digits}
                        </div>
                        
                        <div class="card-footer">
                            <div>
                                <div class="card-holder-label">Card Holder</div>
                                <div class="card-holder-name">${c.holder}</div>
                            </div>
                            <div style="text-align: right;">
                                <div class="card-expiry-label">Expires</div>
                                <div class="card-expiry-date">${c.expiry}</div>
                            </div>
                        </div>

                        ${progressHtml}
                    </div>
                </div>
            `;
        }).join('');
    },

    renderStatements: () => {
        const list = document.getElementById('cardStatementsList');

        list.innerHTML = DataStore.cards.map(c => {
            const isCredit = c.type === 'credit';
            const limit = isCredit ? c.creditLimit : c.balance;
            const used = isCredit ? c.usedAmount : 0; // Debit 'used' isn't really a thing for this view usually, but let's assume 0 for now or change logic
            const available = limit - used;

            return `
                <tr>
                    <td class="font-medium">${c.bank}</td>
                    <td class="text-secondary">${c.type.toUpperCase()}</td>
                    <td><i class="fab fa-cc-${c.network || 'visa'} fa-lg"></i></td>
                    <td style="text-align: right;">${App.formatCurrency(limit)}</td>
                    <td style="text-align: right;">${isCredit ? App.formatCurrency(used) : '-'}</td>
                    <td style="text-align: right;" class="text-success">${App.formatCurrency(available)}</td>
                    <td style="text-align: center;">
                        <span class="status-badge status-completed">Active</span>
                    </td>
                </tr>
            `;
        }).join('');
    }
};

document.addEventListener('DOMContentLoaded', Cards.init);
