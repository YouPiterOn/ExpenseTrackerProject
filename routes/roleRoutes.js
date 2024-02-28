const express = require('express');
const router = express.Router();
const { verifyAdminToken } = require('../middleware/userMiddleware')

const roleController = require('../controllers/roleController');

router.post('/new/:name', roleController.newRoleController);

module.exports = router;