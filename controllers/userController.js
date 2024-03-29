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
        next(error);
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
        next(error);
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
        next(error);
    }
}

async function editUserPageController(req, res) {
    try {
        return res.render('editUser');
    } catch (error) {
        next(error);
    }
}

async function editUsernameController(req, res) {
    try {
        const username = req.user.username;
        const { newUsername } = req.body;
        const candidate = await User.findOne({ username: newUsername });
        if(candidate) {
            res.status(400).json({ error: 'User with this username already exist' });
            return;
        }
        
        const expenses = await Expense.find({ username: username });

        expenses.forEach(expense => {
            expense.username = newUsername;
        })

        const user = await User.findOne({ username: username });
        user.username = newUsername;
        await user.save();
        
        const token = CreateToken({username: user.username, roles: user.roles});
        res.cookie('token', token);

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

async function editPasswordController(req, res) {
    try {
        const username = req.user.username;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ username: username });

        const validPassword = bcrypt.compareSync(oldPassword, user.password);
        if (!validPassword) {
            res.status(400).json({ error: 'Wrong old password' });
            return;
        }

        const hashedPassword = bcrypt.hashSync(password, 1);
        user.password = hashedPassword;
        await user.save();

        res.redirect('/');
    } catch (error) {
        next(error);
    }
}

// ADMIN FUNCTIONS

async function usersListController(req, res) {
    try {
        const username = req.user.username;
        const users = await User.find();
        res.render('usersList', { users, username });
    } catch (error) {
        next(error);
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
        next(error);
    }
}

module.exports = {
    loginPageController,
    registerController,
    loginController,
    logoutController,

    usersListController,
    deleteController,

    editUserPageController,
    editUsernameController,
    editPasswordController,
}