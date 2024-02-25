const { Expense } = require("../models/expense");

async function findExpenseById(id) {
    const expense = await Expense.findOne({ _id: id });
    if(!expense) {
        return null;
    }
    return expense;
}

module.exports = {
    findExpenseById,
}