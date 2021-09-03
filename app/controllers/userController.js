const jwt = require('jsonwebtoken');

class userController{
    static async simpanData(req, res){
        try{
            const { username, nama, password, level } = req.body;
            let con = await req.con
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
    }

    static async getAll(req, res){
        try{
            let con = await req.con
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
    }

    static async getByUsername(req, res){
        const {username} = req.params
        try{
            let con = await req.con
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
    }

    static async updateData(req, res){
        try{
            const { username, nama, password, level } = req.body;
            let con = await req.con
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
    }

    static async deleteData(req, res){
        const {username} = req.params
        try{
            let con = await req.con
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
    }

    static async loginUser(req, res){
        try{
            const { username, password } = req.body
            let con = await req.con
            let [rows, field] =await con.execute(`SELECT * FROM users_tbl WHERE username='${username}' AND password='${password}'`);

            const token = await jwt.sign({
                username : username,
                nama : rows[0].nama,
                level : rows[0].level
            }, 'S3cr3tk3y', { expiresIn : '1d' })
            
            res.send({
                err : false,
                msg : "Login Aplikasi Berhasil",
                data : {username, token}
            })
        }catch(err){
            res.send({
                err : true,
                msg : 'Login Gagal, Check kembali usernam dan password'
            })
        }
    }

    static async infoLogin(req, res){
        try{
            const { username, nama, level } = req.data
            res.send({
                err : false,
                msg : "Info Login User",
                data : { username, nama, level }
            })
        }catch(err){
            res.send({
                err : true,
                msg : 'Login Gagal, Check kembali usernam dan password'
            })
        }
    }
}

module.exports = userController;