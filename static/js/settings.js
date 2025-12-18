/**
 * SETTINGS JS
 */

const Settings = {
    init: () => {
        Settings.renderProfile();
        Settings.renderAccounts();
    },

    renderProfile: () => {
        const user = DataStore.user;
        document.getElementById('profileImage').src = user.avatar;
        document.getElementById('profileName').value = user.name;
        document.getElementById('profileEmail').value = user.email;
    },

    renderAccounts: () => {
        const list = document.getElementById('linkedAccountsList');

        list.innerHTML = DataStore.accounts.map(acc => `
            <div class="account-item">
                <div class="bank-icon-lg">
                    <i class="fas fa-university"></i>
                </div>
                <div class="flex-1">
                    <div class="font-bold">${acc.bankName}</div>
                    <div class="text-sm text-secondary">${acc.accountType} - ${acc.accountNumber}</div>
                </div>
                <div class="text-success font-bold">
                     Connected
                </div>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', Settings.init);
