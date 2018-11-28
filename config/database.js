const mongoose = require('mongoose');
const config = require('./env');

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        mongoose.connect(process.env.URL_DB, { useNewUrlParser: true })
            .then(() => console.log(`Successful database connection: ${process.env.URL_DB}`))
            .catch(err => console.log(`Error trying to connect database: ${err.message}`));
    }
}

module.exports = new Database();