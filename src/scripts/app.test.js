/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
        <div id="totalIncome"></div>
        <div id="totalExpenses"></div>
        <div id="balance"></div>
        <div id="tracker"></div>
        <input id="description" />
        <input id="amount" />
        <input id="transactionDate" />
        <input type="radio" name="transactionType" value="income" checked />
        <input type="radio" name="transactionType" value="expense" />
        <button id="addTransaction"></button>
        <canvas id="expenseChart"></canvas>
    `;
});

// Mock Chart.js global Chart constructor before requiring app.js
beforeEach(() => {
    global.Chart = jest.fn().mockImplementation(() => ({
        destroy: jest.fn(),
        update: jest.fn()
    }));
});

// Require app.js **after** DOM is set up
let app;
beforeEach(() => {
    jest.resetModules();
    app = require('./app');
    app.initApp();
});

describe('Expense Tracker App', () => {
    let originalTransactions;

    beforeEach(() => {
        // Re-require app.js to reset state
        jest.resetModules();
        // Save original transactions array reference
        originalTransactions = app.transactions;
        // Clear transactions for each test
        app.transactions.length = 0;
    });

    afterEach(() => {
        // Restore transactions array
        app.transactions = originalTransactions;
    });

    test('addTransaction adds a transaction and updates totals', () => {
        app.addTransaction('Salary', 1000, 'income', '2024-06-01');
        expect(app.transactions.length).toBe(1);
        expect(app.transactions[0]).toEqual({
            description: 'Salary',
            amount: 1000,
            type: 'income',
            date: '2024-06-01'
        });
    });

    test('updateTotals calculates correct totals', () => {
        app.transactions.push(
            { description: 'Salary', amount: 1000, type: 'income', date: '2024-06-01' },
            { description: 'Food', amount: 200, type: 'expense', date: '2024-06-02' }
        );
        app.updateTotals();
        expect(document.getElementById('totalIncome').innerText).toBe('₹1000.00');
        expect(document.getElementById('totalExpenses').innerText).toBe('₹200.00');
        expect(document.getElementById('balance').innerText).toBe('₹800.00');
    });

    test('displayTransactions renders transactions in tracker', () => {
        app.transactions.push(
            { description: 'Salary', amount: 1000, type: 'income', date: '2024-06-01' },
            { description: 'Food', amount: 200, type: 'expense', date: '2024-06-02' }
        );
        app.displayTransactions();
        const trackerHTML = document.getElementById('tracker').innerHTML;
        expect(trackerHTML).toContain('Salary');
        expect(trackerHTML).toContain('Food');
        expect(trackerHTML).toContain('₹1000.00');
        expect(trackerHTML).toContain('₹200.00');
        expect(trackerHTML).toContain('income');
        expect(trackerHTML).toContain('expense');
    });

    test('addTransaction updates totals and displays transactions', () => {
        app.addTransaction('Salary', 1000, 'income', '2024-06-01');
        app.addTransaction('Food', 200, 'expense', '2024-06-02');
        const totalIncome = document.getElementById('totalIncome').innerText;
        const totalExpenses = document.getElementById('totalExpenses').innerText;
        const balance = document.getElementById('balance').innerText;
        expect(totalIncome).toBe('₹1000.00');
        expect(totalExpenses).toBe('₹200.00');
        expect(balance).toBe('₹800.00');
        const trackerHTML = document.getElementById('tracker').innerHTML;
        expect(trackerHTML).toContain('Salary');
        expect(trackerHTML).toContain('Food');
        expect(trackerHTML).toContain('₹1000.00');
        expect(trackerHTML).toContain('₹200.00');
        expect(trackerHTML).toContain('income');
        expect(trackerHTML).toContain('expense');
    });
});