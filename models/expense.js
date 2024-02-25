const mongoose = require("mongoose");
const Schema =  require("mongoose").Schema;

const ExpenseSchema = new Schema({
    userId: String,
    name: String,
    sum: Number,
    sign: Boolean,
    date: String,
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = {
    ExpenseSchema,
    Expense,
};