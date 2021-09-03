const express = require('express');
const user = express.Router();

const connection = require('../config/database');
const userController = require('../controllers/userController');
const Auth = require('../middleware/Auth');

user.use(async (req, res, next)=>{
    const con = await connection;
    if(!con){
        res.status(401).send({
            err : true,
            msg : "Database tidak ditemukan | Server Mati"
        });
        return false;
    }
    req.con = con;
    next();
})

user.get('/all', Auth, userController.getAll)

user.get('/one/:username', userController.getByUsername)

user.post('/', userController.simpanData)

user.put('/', userController.updateData)

user.delete('/del/:username', userController.deleteData)

user.post('/login', userController.loginUser)

user.get('/info', Auth, userController.infoLogin)

module.exports = user;