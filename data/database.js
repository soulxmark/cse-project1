const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('✅ Database is already initialized.');
        return callback(null, database);
    }

    if (!process.env.MONGODB_URL) {
        return callback(new Error("❌ MONGODB_URL is not set in environment variables."));
    }

    MongoClient.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            database = client.db(); // ✅ Store the actual database instance
            console.log('✅ Database connection successful.');
            callback(null, database);
        })
        .catch((err) => {
            console.error('❌ Database connection failed:', err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('❌ Database not initialized. Call initDb first.');
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
