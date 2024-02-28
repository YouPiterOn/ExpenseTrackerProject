const { User } = require('../models/user');

async function setOnline(username) {
    try {
        const user = await User.findOne({username: username});
        user.onlineStatus = true;
        await user.save();
    } catch (error) {
        console.error(error);
    }
}

async function setOffline(username) {
    try {
        const user = await User.findOne({username: username});
        user.onlineStatus = false;
        await user.save();
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    setOnline,
    setOffline,
}