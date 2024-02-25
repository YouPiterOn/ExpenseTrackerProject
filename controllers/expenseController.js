const { json } = require("express");
const { Expense } = require("../models/expense");
const expenseHandlers = require("../handlers/expenseHandlers")

async function ExpensesListController (req, res) {
    try {
        const expenses = await Expense.find();
        res.render('list', { expenses });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getExpenseByIdController (req, res) {
    try {
        const expense = expenseHandlers.findExpenseById(req.params.id)
        if (expense == null) {
          return res.status(404).send('Expense not found');
        }
        res.json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function postNewExpenseController (req, res) {
    try {
        const { userId, name, sum, sign, date } = req.body;
        await Expense.create({ userId, name, sum, sign, date  });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postDeleteExpenseController(req, res) {
    try {
        id = req.params.id
        Expense.findByIdAndDelete(id).then(result => {
            res.redirect('/');
        })
        .catch(error => {
            console.error(error);
            return res.status(404).send('User not found');
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    ExpensesListController,
    getExpenseByIdController,
    postNewExpenseController,
    postDeleteExpenseController
}