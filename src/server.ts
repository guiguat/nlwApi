import express from 'express';

const app = express();

app.get("/", (req, res)=>{
    res.send('server working')
})

app.listen(3333)