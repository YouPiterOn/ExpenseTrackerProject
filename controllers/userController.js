const { json } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Expense } = require("../models/expense")
const { secretKey } = require("../config");

function CreateToken (payload) {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

async function loginPageController(req, res) {
    try {
        return res.render('login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function registerController(req, res) {
    try {
        const { username, password } = req.body;
        const candidate = await User.findOne({ username: username });
        if(candidate) {
            res.status(400).json({ error: 'User with this username already exist' });
            return;
        }
        const hashedPassword = bcrypt.hashSync(password, 1);
        const role = 'USER';
        await User.create({username: username, password: hashedPassword, roles: [role]});

        const token = CreateToken({username: username, roles: [role]});
        res.cookie('token', token);
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loginController(req, res) {
    try {
        const { username, password } = req.body;
        const candidate = await User.findOne({ username: username });
        if(!candidate) {
            res.status(404).json({ error: 'Wrong username or password' });
            return;
        }
        const validPassword = bcrypt.compareSync(password, candidate.password);
        if(!validPassword) {
            res.status(404).json({ error: 'Wrong username or password' });
            return;
        }
        const token = CreateToken({username: username, roles: candidate.roles});
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function logoutController(req, res) {
    try{
        res.clearCookie('token');
        res.redirect('/user');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// ADMIN FUNCTIONS

async function usersListController(req, res) {
    try {
        const username = req.user.username;
        const users = await User.find();
        res.render('usersList', { users, username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteController(req, res) {
    try {
        const username = req.params.username;
        User.findOneAndDelete({username: username}).then(result => {
            Expense.deleteMany({username: username}).then(iresult => {
                res.redirect('/user/list');
            }); 
        }).catch(error => {
            console.error(error);
            return res.status(404).send('User not found');
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    loginPageController,
    registerController,
    loginController,
    logoutController,
    usersListController,
    deleteController,
}