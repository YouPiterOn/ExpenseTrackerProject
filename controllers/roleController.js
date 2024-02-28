const { Role } = require("../models/role");

async function newRoleController(req, res) {
    try{
        const roleName = req.params.name;
        finalRoleName = roleName.toUpperCase();
        await Role.create({value: finalRoleName});
        res.status(200).json({ status: 'Role created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    newRoleController,
}