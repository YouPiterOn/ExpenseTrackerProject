const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdminToken } = require('../middleware/userMiddleware')

const userController = require('../controllers/userController');

router.get('/', userController.loginPageController);
router.post('/login', userController.loginController);
router.post('/register', userController.registerController);
router.post('/logout', userController.logoutController);

router.get('/edit', verifyToken, userController.editUserPageController);
router.post('/edit/username', verifyToken, userController.editUsernameController);
router.get('/edit/password', verifyToken, userController.editPasswordController);

router.get('/list', verifyAdminToken,  userController.usersListController);
router.post('/delete/:username', verifyAdminToken, userController.deleteController);

module.exports = router;