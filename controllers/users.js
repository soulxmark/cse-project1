const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

//----------- Get all users ---------------
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    });
};

//----------- Get single user ---------------
const getSingle = async (req, res) => {
    const userId = ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null;
    if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const result = await mongodb.getDatabase().db().collection('users').findOne({ _id: userId });
    if (!result) {
        return res.status(404).json({ error: "User not found" });
    }

    res.setHeader('Content-type', 'application/json');
    res.status(200).json(result);
};

//----------- Create user ---------------
const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(201).json({ message: "User created", id: response.insertedId });
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
};

//----------- Update user ---------------
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null;
    if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().db().collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
};

//----------- Delete user ---------------
const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null;
    if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
};

// Modules Export
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
