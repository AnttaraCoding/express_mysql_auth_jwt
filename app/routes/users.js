const express = require('express');
const user = express.Router();

user.get('/all', (req, res)=>{
    res.send('ini route get all data')
})

user.get('/one/:username', (req, res)=>{
    const {username} = req.params
    res.send('ini route get data by username')
})

user.post('/', (req, res)=>{
    res.send('ini route insert')
})

user.put('/', (req, res)=>{
    res.send('ini route update')
})

user.delete('/del/:username', (req, res)=>{
    res.send('ini route delete')
})

module.exports = user;