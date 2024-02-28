const express = require('express');
const router = express.Router();
const { verifyAdminToken } = require('../middleware/userMiddleware')

const userController = require('../controllers/userController');

router.get('/', userController.loginPageController);
router.post('/login', userController.loginController);
router.post('/register', userController.registerController);
router.post('/logout', userController.logoutController);

router.get('/list', verifyAdminToken,  userController.usersListController);
router.post('/delete/:username', verifyAdminToken, userController.deleteController);

module.exports = router;