/**
 * MOCK DATA STORE
 * Simulates a backend database
 */

const currentUser = {
    name: "Chandrachud Siddharth",
    email: "chandrachud.s@fintech.com",
    avatar: "https://ui-avatars.com/api/?name=Chandrachud+Siddharth&background=0D8ABC&color=fff"
};

const bankAccounts = [
    {
        id: "b1",
        bankName: "HDFC Bank",
        accountType: "Savings",
        accountNumber: "**** 1234",
        balance: 145000.50,
        color: "linear-gradient(135deg, #00416A, #E4E5E6)"
    },
    {
        id: "b2",
        bankName: "ICICI Bank",
        accountType: "Salary",
        accountNumber: "**** 5678",
        balance: 45000.00,
        color: "linear-gradient(135deg, #8E0E00, #1F1C18)"
    }
];

const cards = [
    {
        id: "c1",
        type: "credit",
        bank: "HDFC Regalia",
        last4Digits: "4545",
        expiry: "12/28",
        holder: "CHANDRACHUD SIDDHARTH",
        creditLimit: 500000,
        usedAmount: 45000,
        dueDate: "2023-11-20",
        network: "visa"
    },
    {
        id: "c2",
        type: "debit",
        bank: "ICICI Platinum",
        last4Digits: "8899",
        expiry: "09/26",
        holder: "CHANDRACHUD SIDDHARTH",
        balance: 45000.00, // Linked to b2
        network: "mastercard"
    }
];

const transactions = [
    {
        id: "t1",
        date: "2023-10-25",
        merchant: "Netflix",
        category: "Subscription",
        amount: 649,
        type: "debit",
        paymentMethod: "Credit Card",
        cardLast4: "4545",
        status: "Completed",
        icon: "fa-film"
    },
    {
        id: "t2",
        date: "2023-10-24",
        merchant: "Swiggy",
        category: "Food",
        amount: 450,
        type: "debit",
        paymentMethod: "UPI",
        upiApp: "GPay",
        status: "Completed",
        icon: "fa-utensils"
    },
    {
        id: "t3",
        date: "2023-10-24",
        merchant: "Salary",
        category: "Income",
        amount: 85000,
        type: "credit",
        paymentMethod: "Bank Transfer",
        bank: "ICICI Bank",
        status: "Completed",
        icon: "fa-briefcase"
    },
    {
        id: "t4",
        date: "2023-10-23",
        merchant: "Uber",
        category: "Transport",
        amount: 320,
        type: "debit",
        paymentMethod: "Credit Card",
        cardLast4: "4545",
        status: "Completed",
        icon: "fa-car"
    },
    {
        id: "t5",
        date: "2023-10-22",
        merchant: "Shell Station",
        category: "Fuel",
        amount: 2500,
        type: "debit",
        paymentMethod: "Credit Card",
        cardLast4: "4545",
        status: "Completed",
        icon: "fa-gas-pump"
    }
];

const fixedExpenses = [
    {
        id: "f1",
        name: "Apartment Rent",
        category: "Rent",
        amount: 25000,
        frequency: "Monthly",
        dueDate: "5th",
        autoPay: false
    },
    {
        id: "f2",
        name: "Netflix Premium",
        category: "Subscription",
        amount: 649,
        frequency: "Monthly",
        dueDate: "25th",
        autoPay: true
    },
    {
        id: "f3",
        name: "Gym Membership",
        category: "Health",
        amount: 3000,
        frequency: "Monthly",
        dueDate: "1st",
        autoPay: false
    }
];

const debts = [
    {
        id: "d1",
        type: "Home Loan",
        bank: "SBI",
        principal: 5000000,
        remaining: 4200000,
        emi: 45000,
        interestRate: 8.5,
        dueDate: "10th",
        paidMonths: 24,
        totalMonths: 180
    }
];

// Helper to simulate API delay
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Data Access Object
const DataStore = {
    getUser: async () => { await simulateDelay(); return currentUser; },
    getAccounts: async () => { await simulateDelay(); return bankAccounts; },
    getCards: async () => { await simulateDelay(); return cards; },
    getTransactions: async () => { await simulateDelay(); return transactions; },
    getFixedExpenses: async () => { await simulateDelay(); return fixedExpenses; },
    getDebts: async () => { await simulateDelay(); return debts; },

    // Quick synchronous accessters for UI rendering
    user: currentUser,
    accounts: bankAccounts,
    cards: cards,
    transactions: transactions,
    fixedExpenses: fixedExpenses,
    debts: debts
};
