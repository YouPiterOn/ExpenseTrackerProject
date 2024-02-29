const fs = require('fs');
const path = require('path');

const errorFolderPath = path.join(__dirname, '..', 'errors');


function errorHandler(error, req, res, next) {
    console.error(error.stack);
    const errorMessage = `${new Date().toISOString()} - ${error.stack}\n`;

    const errorLogPath = path.join(errorFolderPath, 'error.log');

    fs.appendFile(errorLogPath, errorMessage, (err) => {
        if (err) {
            console.error(err);
        }
    });

    res.status(500).send('Internal Server Error');
}

module.exports = { 
    errorHandler,
};