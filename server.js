const express = require('express');
const database = require('./data/database'); 
const app = express();

app.use('/', require('./routes'));

// Start database connection first
database.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Database connected! Server running on http://localhost:${PORT}`);
        });
    }
});
