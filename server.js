const express = require('express');
const database = require('./data/database'); // ✅ Correct relative path
const app = express();

app.use('/',require('./routes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// mongodb
mongdb.initDB((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and Node is running on port ${port}`)});
    }
});
