const mongoose = require("mongoose");
const Schema =  require("mongoose").Schema;

const ExpenseSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String, required: true},
    sum: {type: Number, required: true},
    sign: {type: Boolean, required: true},
    date: {type: String, required: true},
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = {
    ExpenseSchema,
    Expense,
};