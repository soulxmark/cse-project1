const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
//Database Routes
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

//----------- CRUD Section------------------
router.get('/', usersController.createUser);

router.get('/:id', usersController.updateUser);

router.get('/:id', usersController.deleteUser);

module.exports = router; // ✅ Ensure you're exporting only the router!
