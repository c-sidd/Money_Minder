/**
 * Insights Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    App.checkAuth();

    // Simulate Loading
    setTimeout(loadInsights, 800);
});

function loadInsights() {
    // Mock Data for "September 2025"
    const data = {
        topInsight: {
            title: "Weekend Spender",
            description: "You spend <strong>45% more</strong> on weekends compared to weekdays. Dining out is the biggest contributor.",
            trend: [30, 45, 30, 80, 95, 20, 40] // Mon-Sun rough relative values
        },
        categories: [
            { name: "Dining & Food", amount: 12450, total: 30000, colorClass: "cat-dining" },
            { name: "Transport (Uber/Fuel)", amount: 5600, total: 30000, colorClass: "cat-transport" },
            { name: "Shopping", amount: 3200, total: 30000, colorClass: "cat-shopping" },
            { name: "Bills & Utilities", amount: 2100, total: 30000, colorClass: "cat-bills" }
        ],
        merchants: [
            { name: "Swiggy / Zomato", count: 12, amount: 4500, icon: "🍔" },
            { name: "Uber Rides", count: 18, amount: 3200, icon: "bw" }, // bw = black&white logic if img
            { name: "Starbucks", count: 5, amount: 1850, icon: "☕" },
            { name: "Amazon India", count: 3, amount: 4100, icon: "📦" }
        ]
    };

    renderTrendChart(data.topInsight.trend);
    renderCategories(data.categories);
    renderMerchants(data.merchants);
}

function renderTrendChart(values) {
    const container = document.getElementById('mini-trend-chart');
    container.innerHTML = '';

    values.forEach(val => {
        const bar = document.createElement('div');
        bar.className = 'mini-bar';
        // highlight weekends (last 2)
        // logic: simplified for mock, just if value > 60 make it 'active' color
        if (val > 60) bar.classList.add('active');

        // precise height
        bar.style.height = `${val}%`;
        container.appendChild(bar);
    });
}

function renderCategories(list) {
    const container = document.getElementById('category-list');
    container.innerHTML = '';

    // Calculate max to normalize bars relative to highest spend category
    const maxAmount = Math.max(...list.map(i => i.amount));

    list.forEach(cat => {
        const percent = (cat.amount / maxAmount) * 100;

        const el = document.createElement('div');
        el.className = 'cat-item fade-in';
        el.innerHTML = `
            <div class="cat-header">
                <span class="c-name">${cat.name}</span>
                <span class="c-amount">₹${cat.amount.toLocaleString()}</span>
            </div>
            <div class="cat-bar-track">
                <div class="cat-bar-fill ${cat.colorClass}" style="width: 0%" data-width="${percent}%"></div>
            </div>
        `;
        container.appendChild(el);
    });

    // Trigger animations after render
    requestAnimationFrame(() => {
        container.querySelectorAll('.cat-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
    });
}

function renderMerchants(list) {
    const container = document.getElementById('merchant-list');
    container.innerHTML = '';

    list.forEach(m => {
        // Handle Uber icon special case or just generic logic
        const icon = m.name.includes('Uber') ? '🚗' : m.icon;

        const el = document.createElement('div');
        el.className = 'merchant-item fade-in';
        el.innerHTML = `
            <div class="m-info">
                <div class="m-icon">${icon}</div>
                <div>
                    <div class="m-name">${m.name}</div>
                    <div class="m-count">${m.count} txns</div>
                </div>
            </div>
            <div class="m-amount">₹${m.amount.toLocaleString()}</div>
        `;
        container.appendChild(el);
    });
}
