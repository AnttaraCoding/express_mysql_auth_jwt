const express = require('express');
const app = express();
const port = '3002';
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');

// Parser
app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());

// Route
app.use('/user', userRoute);

app.use('*',(req,res)=>{
    res.status(404).send({
        err : true,
        msg : "Route Not Found"
    })
})

app.listen(port, ()=>{
    console.log(`running on localhost:${port}`);
})