const winston = require('winston');
const path = require('path');

const errorLogPath = path.join(__dirname, '..', 'logs/error.log');
const requestLogPath = path.join(__dirname, '..', 'logs/request.log');


const basicLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: requestLogPath })
    ]
});

const errorLogger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: errorLogPath, level: 'error' })
    ]
});
  
function logMw(req, res, next) {
    basicLogger.info({
        message: 'Request',
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString(),
        userAgent: req.get('User-Agent'),
        ip: req.ip
    });
    next();
}

function errorMw(error, req, res, next) {
    errorLogger.error({
        message: 'Error',
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        userAgent: req.get('User-Agent'),
        ip: req.ip
    });
}

module.exports = {
    logMw,
    errorMw,
}