const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/userMiddleware')
const { errorHandler } = require('../middleware/errorMiddleware')

const expenseController = require('../controllers/expenseController');

router.get('/', verifyToken, expenseController.ExpensesListController);
router.post('/new', verifyToken, expenseController.postNewExpenseController);
router.post('/delete/:id', verifyToken, expenseController.postDeleteExpenseController);
router.post('/change', verifyToken, expenseController.postChangeExpenseController);
router.get('/months', verifyToken, expenseController.getMonthPageController);

router.use(errorHandler);

module.exports = router;