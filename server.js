const express = require('express');
const bodyParser = require('body-parser');
const database = require('./data/database'); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Ensure this file exists

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
// Register Routes

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin,Content-Type,Accept,Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));
// **Add Swagger Route**
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



// Start database connection first
database.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database connected! Server running on http://localhost:${port}`);
            console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
        });
    }
});
