const { json } = require("express");
const { Expense } = require("../models/expense");
const cache = require('memory-cache');


async function ExpensesListController (req, res) {
    try {
        const username = req.user.username;
        let { sortBy, sortOrder } = req.query;

        sortBy = sortBy || 'date';
        sortOrder = sortOrder || 'asc';

        let expenses = cache.get(username);

        if (!expenses) {
            expenses = await Expense.find({ username: username });
            cache.put(username, expenses);
        }

        expenses.sort((a, b) => {
            let comparison = 0;

            if (sortBy === 'date') {
                const dateA = new Date(a[sortBy]);
                const dateB = new Date(b[sortBy]);
                comparison = dateA - dateB;
            } 
            else if (sortBy === 'name') {
                comparison = a[sortBy].localeCompare(b[sortBy]);
            } 
            else if (sortBy === 'sum'){
                const sumA = a.sum * (a.sign ? 1 : -1);
                const sumB = b.sum * (b.sign ? 1 : -1);
                comparison = sumA - sumB;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });

        let { month } = req.query

        if(month) {
            expenses = expenses.filter(expense => {
                const date = expense.date.substring(0, 7)
                return (date == month)
            });
        }

        res.render('list', { expenses, username });
    } catch (error) {
        next(error);
    }
}

async function postNewExpenseController (req, res) {
    try {
        const { name, sum, sign, date } = req.body;
        const username = req.user.username;
        await Expense.create({ username, name, sum, sign, date });
        const updatedExpenses = await Expense.find({ username: username });
        cache.put(username, updatedExpenses);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postDeleteExpenseController(req, res) {
    try {
        const id = req.params.id;
        const username = req.user.username;
        
        await Expense.findOneAndDelete({ _id: id, username: username });

        const expenses = cache.get(username) || [];
        const updatedExpenses = expenses.filter(expense => expense._id.toString() !== id);
        cache.put(username, updatedExpenses);
            
        return res.redirect('/');
    } catch (error) {
        next(error);
    }
}

async function postChangeExpenseController(req, res) {
    try {
        const { id, name, sum, sign, date } = req.body;
        const username = req.user.username;

        const expense = await Expense.findOne({ _id: id, username: username });
        
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        expense.name = name;
        expense.sum = sum;
        expense.sign = sign;
        expense.date = date;

        await expense.save();

        const expenses = cache.get(username) || [];
        const updatedExpenses = expenses.map(exp => {
            if (exp._id.toString() === id) {
                return expense.toJSON();
            }
            return exp;
        });
        cache.put(username, updatedExpenses);

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

class Month {
    date = "";
    income = 0;
    expense = 0;
    total = 0;
}

async function getMonthPageController(req, res) {
    try{
        const expenses = await Expense.find();
    let months = [];
    expenses.forEach(expense => {
        const date = expense.date.substring(0, 7);
        let month = months.find(month => month.date === date);
        if (!month) {
            month = new Month();
            month.date = date;
            months.push(month);
        }

        if(expense.sign) {
            month.income += expense.sum;
            month.total += expense.sum;
        }
        else {
            month.expense -= expense.sum;
            month.total -= expense.sum;
        }
    });

    const { sortBy, sortOrder } = req.query;
        if (sortBy && sortOrder) {
            months.sort((a, b) => {
                let comparison = 0;

                if (sortBy === 'date') {
                    const dateA = new Date(a[sortBy]);
                    const dateB = new Date(b[sortBy]);
                    comparison = dateA - dateB;
                } 
                else {
                    comparison = a[sortBy] - b[sortBy];
                }

                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

    res.render('monthList', { months, username: req.user.username })
    } catch(error) {
        next(error);
    }
}

module.exports = {
    ExpensesListController,
    postNewExpenseController,
    postDeleteExpenseController,
    postChangeExpenseController,
    getMonthPageController,
}