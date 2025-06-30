const transactions = [];
let chartInstance = null;

function addTransaction(description, amount, type, date) {
    transactions.push({ description, amount, type, date });
    updateTotals();
    displayTransactions();
}

function updateTotals() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    document.getElementById('totalIncome').innerText = `₹${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpenses').innerText = `₹${totalExpenses.toFixed(2)}`;
    document.getElementById('balance').innerText = `₹${totalBalance.toFixed(2)}`;
}

function displayTransactions() {
    const trackerTab = document.getElementById('tracker');
    trackerTab.innerHTML = ''; // Clear previous transactions

    transactions.forEach(transaction => {
        const transactionRow = document.createElement('div');
        transactionRow.className = 'row mb-2';

        transactionRow.innerHTML = `
            <div class="col-md-3">${transaction.date}</div>
            <div class="col-md-3">${transaction.description}</div>
            <div class="col-md-3">${transaction.type === 'income' ? `<span class="text-success">₹${transaction.amount.toFixed(2)}</span>` : `<span class="text-danger">₹${transaction.amount.toFixed(2)}</span>`}</div>
            <div class="col-md-3">${transaction.type}</div>
        `;

        trackerTab.appendChild(transactionRow);
    });
}

document.getElementById('addTransaction').addEventListener('click', function() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('transactionDate').value;
    const type = document.querySelector('input[name="transactionType"]:checked').value;

    if (description && !isNaN(amount) && amount > 0 && date) {
        addTransaction(description, amount, type, date);

        // Clear form fields
        document.getElementById('description').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('transactionDate').value = '';
        document.querySelector('input[name="transactionType"][value="income"]').checked = true;
    } else {
        alert('Please fill out all fields correctly.');
    }
});

function renderChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    const income = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((acc, curr) => acc + curr.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((acc, curr) => acc + curr.amount, 0);

    // Destroy previous chart instance if it exists to avoid overlay
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [income, expenses],
                backgroundColor: ['#d4edda', '#f8d7da'],
                borderColor: ['#155724', '#721c24'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ₹${context.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}

function initApp() {
    const addBtn = document.getElementById('addTransaction');
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            renderChart();
        });
    }
    renderChart();
    updateTotals();
}

// Only auto-run in browser, not during tests
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    window.addEventListener('DOMContentLoaded', initApp);
}

// Export everything needed for tests
module.exports = {
    renderChart,
    updateTotals,
    displayTransactions,
    addTransaction,
    initApp,
    // export transactions array if needed
    transactions: [],
};