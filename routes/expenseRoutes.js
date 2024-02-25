const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.ExpensesListController);
router.get('/:id', expenseController.getExpenseByIdController);
router.post('/new', expenseController.postNewExpenseController);
router.post('/delete/:id', expenseController.postDeleteExpenseController);

module.exports = router;