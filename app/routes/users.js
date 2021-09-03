const express = require('express');
const user = express.Router();

const connection = require('../config/database');

user.get('/all', async (req, res)=>{
    try{
        let con = await connection
        let [rows, fields] =  await con.execute(`SELECT * FROM users_tbl`);
        rows = Array.from(rows);

        res.send({
            err : false,
            msg : rows.length ? "Data ditemukan" : "Data tidak ditemukan",
            data : rows
        })
    }catch(err){
        res.send({
            err : true,
            msg : err
        })
    }
})

user.get('/one/:username', async (req, res)=>{
    const {username} = req.params
    try{
        let con = await connection
        let [rows, field] =await con.execute(`SELECT * FROM users_tbl WHERE username='${username}'`);
        rows = Array.from(rows);
        res.send({
            err : false,
            msg : rows.length ? "Data ditemukan" : "Data tidak ditemukan",
            data : rows
        })
    }catch(err){
        res.send({
            err : true,
            msg : err
        })
    }
})

user.post('/', async (req, res)=>{
    try{
        const { username, nama, password, level } = req.body;
        let con = await connection
        await con.execute(`INSERT INTO users_tbl (username, nama, password, level) values('${username}','${nama}','${password}','${level}')`);

        res.send({
            err : false,
            msg : "Data User berhasil disimpan",
            data : req.body
        })
    }catch(err){
        res.send({
            err : true,
            msg : err
        })
    }
})

user.put('/', async (req, res)=>{
    try{
        const { username, nama, password, level } = req.body;
        let con = await connection
        await con.execute(`UPDATE users_tbl SET nama='${nama}', password='${password}', level='${level}' WHERE username='${username}'`);

        res.send({
            err : false,
            msg : `Data User ${username} berhasil diupdate`,
            data : req.body
        })
    }catch(err){
        res.send({
            err : true,
            msg : err
        })
    }
})

user.delete('/del/:username', async (req, res)=>{
    const {username} = req.params
    try{
        let con = await connection
        let [rows, field] =await con.execute(`SELECT * FROM users_tbl WHERE username='${username}'`);
        rows = Array.from(rows);
        if(rows){
            await con.execute(`DELETE FROM users_tbl WHERE username='${username}'`);
        }
        res.send({
            err : false,
            msg : rows.length ? "Data Berhasil dihapus" : "Data tidak ditemukan",
            data : rows
        })
    }catch(err){
        res.send({
            err : true,
            msg : err
        })
    }
})

module.exports = user;