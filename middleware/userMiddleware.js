const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

function verifyToken(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
        return res.redirect('/user');
    }
  
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.error(error);
            return res.redirect('/user');
        }
        req.user = decoded;
        next();
    });
}

function verifyAdminToken(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
        return res.redirect('/user');
    }
  
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.error(error);
            return res.redirect('/user');
        }
        const roles = decoded.roles;
        if(!roles.includes('ADMIN')){
            res.status('403').json({ error: 'Permission Error'});
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken,
    verifyAdminToken,
}