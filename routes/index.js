const router = require('express').Router();


router.use('/',require('./swagger'));


router.get("/", (req, res) =>{
    // #swagger.tags=['Hello woorld']
    res.send("Hello woorld")
});

router.use('/users', require('./users'));
module.exports = router;