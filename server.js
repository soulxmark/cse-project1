//Require - imports
const express = require('express');
const bodyParse = require('body-parser');
const database = require('./data/database'); 
const app = express();

const port = process.env.PORT || 3001;
//-----Routes---------
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/", require("./routes"));
// Start database connection first
database.initDb((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        app.listen(port, () => {console.log(`Database connected! Server running on http://localhost:${port}`);});
    }
});
