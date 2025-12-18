/**
 * REPORTS JS
 */

const Reports = {
    init: () => {
        Reports.renderBarChart();
        Reports.renderDonutChart();
    },

    renderBarChart: () => {
        const container = document.getElementById('barChartContainer');
        // Mock Data: Last 6 months
        const data = [
            { month: 'Jun', income: 80, expense: 40 },
            { month: 'Jul', income: 82, expense: 45 },
            { month: 'Aug', income: 80, expense: 50 },
            { month: 'Sep', income: 85, expense: 42 },
            { month: 'Oct', income: 85, expense: 60 },
            { month: 'Nov', income: 90, expense: 35 }
        ];

        const maxVal = 100; // Normalizing to 100 for simplicity

        const barsHtml = data.map(d => `
            <div class="bar-group">
                <div class="bar" style="height: ${d.income}%; background-color: var(--success); width: 12px; margin-right: 2px;" title="Income: ${d.income}k"></div>
                <div class="bar" style="height: ${d.expense}%; background-color: var(--danger); width: 12px;" title="Expense: ${d.expense}k"></div>
                <span class="bar-label">${d.month}</span>
            </div>
        `).join('');

        container.innerHTML = `<div class="css-bar-chart">${barsHtml}</div>`;
    },

    renderDonutChart: () => {
        const container = document.getElementById('donutChartContainer');

        // Mock Categories
        const categories = [
            { name: 'Rent', value: 40, color: '#4fd1c5' },
            { name: 'Food', value: 25, color: '#667eea' },
            { name: 'Transport', value: 15, color: '#ed8936' },
            { name: 'Others', value: 20, color: '#f56565' }
        ];

        let gradientString = '';
        let currentDeg = 0;

        categories.forEach(cat => {
            const deg = (cat.value / 100) * 360;
            gradientString += `${cat.color} ${currentDeg}deg ${currentDeg + deg}deg, `;
            currentDeg += deg;
        });

        gradientString = gradientString.slice(0, -2); // Remove last comma

        const legendHtml = categories.map(cat => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${cat.color}"></div>
                <span>${cat.name} (${cat.value}%)</span>
            </div>
        `).join('');

        container.style.flexDirection = 'column';
        container.innerHTML = `
            <div class="css-donut-chart" style="background: conic-gradient(${gradientString})">
                <div class="donut-hole">
                    <span class="font-bold text-xl">Total</span>
                    <span class="text-sm text-secondary">₹32k</span>
                </div>
            </div>
            <div class="donut-legend">
                ${legendHtml}
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', Reports.init);
