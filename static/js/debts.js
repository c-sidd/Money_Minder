/**
 * DEBTS JS
 */

const Debts = {
    init: async () => {
        Debts.renderLoans();
        Debts.renderEMI();
    },

    renderLoans: () => {
        const container = document.getElementById('loansContainer');

        container.innerHTML = DataStore.debts.map(loan => {
            const paidAmount = loan.principal - loan.remaining;
            const progress = (paidAmount / loan.principal) * 100;

            return `
                <div class="loan-card">
                    <div class="loan-header">
                        <div class="flex gap-4">
                            <div class="loan-icon"><i class="fas fa-home"></i></div>
                            <div>
                                <h3 class="font-bold text-lg">${loan.type}</h3>
                                <p class="text-sm text-secondary">${loan.bank}</p>
                            </div>
                        </div>
                        <div class="badge status-completed" style="background: rgba(66, 153, 225, 0.1); color: var(--info);">Active</div>
                    </div>
                    
                    <div class="loan-details">
                        <div class="loan-detail-item">
                            <label>Principal Amount</label>
                            <span>${App.formatCurrency(loan.principal)}</span>
                        </div>
                        <div class="loan-detail-item">
                            <label>Outstanding</label>
                            <span class="text-danger">${App.formatCurrency(loan.remaining)}</span>
                        </div>
                        <div class="loan-detail-item">
                            <label>Monthly EMI</label>
                            <span>${App.formatCurrency(loan.emi)}</span>
                        </div>
                        <div class="loan-detail-item">
                            <label>Interest Rate</label>
                            <span>${loan.interestRate}%</span>
                        </div>
                    </div>

                    <div class="progress-section">
                        <label>
                            <span>Repayment Progress</span>
                            <span>${Math.round(progress)}%</span>
                        </label>
                        <div class="progress-bg">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <div class="flex justify-between text-xs text-secondary mt-1">
                            <span>${loan.paidMonths} months paid</span>
                            <span>${loan.totalMonths - loan.paidMonths} months left</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderEMI: () => {
        const list = document.getElementById('emiList');

        list.innerHTML = DataStore.debts.map(loan => `
            <tr>
                <td class="font-medium">${loan.type}</td>
                <td class="text-secondary">${loan.bank}</td>
                <td class="text-warning">Due ${loan.dueDate}</td>
                <td><span class="badge status-pending">Pending</span></td>
                <td style="text-align: right;" class="font-bold">${App.formatCurrency(loan.emi)}</td>
                <td style="text-align: center;">
                    <button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">Pay</button>
                </td>
            </tr>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', Debts.init);
