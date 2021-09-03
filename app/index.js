const express = require('express');
const app = express();
const port = '3002';

app.get('/', (req, res)=>{
    res.send({
        msg : 'hello world'
    })
})


app.listen(port, ()=>{
    console.log(`running on localhost:${port}`);
})