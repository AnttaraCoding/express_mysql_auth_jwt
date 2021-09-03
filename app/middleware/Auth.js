const jwt = require('jsonwebtoken');

const Auth = async(req,res,next)=>{
    if(!req.header('Authorization')) return res.status(401).send({
        err : true,
        msg : "Access Denied"
    });

    const Token = req.header('Authorization').replace('Bearer ', '');

    try{
        const data = jwt.verify(Token, 'S3cr3tk3y');
        req.data = {
            username : data.username,
            nama    : data.nama,
            level   : data.level
        };
        next();
    }catch(err){
        res.status(401).send({
            err : true,
            msg : "Not Authorization to access this route"
        })
    }
}

module.exports = Auth;