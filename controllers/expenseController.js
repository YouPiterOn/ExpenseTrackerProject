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

        res.render('list', { expenses, username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        const id = req.params.id
        const username = req.user.username
        Expense.findOneAndDelete({_id: id, username: username}).then(result => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            return res.status(404).send('Expense not found');
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postChangeExpenseController(req, res) {
    try {
        const { id, name, sum, sign, date } = req.body;
        
        const expense = await Expense.findOne({_id: id, username: req.user.username});
        
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }

        expense.name = name;
        expense.sum = sum;
        expense.sign = sign;
        expense.date = date;

        await expense.save();

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    ExpensesListController,
    postNewExpenseController,
    postDeleteExpenseController,
    postChangeExpenseController,
}