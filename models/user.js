const mongoose = require("mongoose");
const Schema =  require("mongoose").Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    onlineStatus: {type: Boolean, default: false},
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    UserSchema,
    User,
};