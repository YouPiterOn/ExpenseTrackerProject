const mongoose = require("mongoose");
const Schema =  require("mongoose").Schema;

const RoleSchema = new Schema({
    value: {type: String, unique: true}
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = {
    RoleSchema,
    Role,
};