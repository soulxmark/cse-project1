const mongdb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

//----------- Get the database---------------
const getAll = async (req,res) => {
    const result = await mongdb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongdb.getDatabase().db().collection('users').find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-type', 'application/json');
        res.status(200).json(users[0]);
    });
};
//================CRUD Section=======================

//------------Creating data from mongodb----------
const createUser = async (req,res) =>{
    const userId = new ObjectId(req.params.id);
    const user = {
        email:     req.body.email,
        username:  req.body.username,
        name:      req.body.name,
        ipaddress: req.body.ipaddress
    };
    const reponse = await mongodb.getDatabase().db().collection('users').insertOne(user);
        if(reponse.acknowledged) {
            res.status(204).send();
        }
        else{
            res.status(500).json(reponse.error ||  'Some error occurred while updating the user.');
        }
};

//---------Update Users Account Details --------
const updateUser = async (req,res) =>{
    const userId = new ObjectId(req.params.id);
    const user = {
        email:     req.body.email,
        username:  req.body.username,
        name:      req.body.name,
        ipaddress: req.body.ipaddress
    };
    const reponse = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId},user);
        if(reponse.modifiedCount > 0){
            reponse.status(204).send();
        }
        else{
            res.status(500).json(reponse.error ||  'Some error occurred while updating the user.');
        }
};


const deleteUser = async (req,res) =>{
    const userId = new ObjectId(req.params.id);
    const reponse = await mongodb.getDatabase().db().collection('users').deleteOne({_id: userId});
        if(reponse.deleteUserCount > 0) {
            reponse.status(204).send();
        }
        else{
            res.status(500).json(reponse.error ||  'Some error occurred while updating the user.');
        }
};

//Modules Export
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
