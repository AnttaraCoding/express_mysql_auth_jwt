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
}

module.exports = userController;