const express=require('express');
const {nanoid}=require('nanoid');
const db=require('./db/db');
const path=require('path');
const dotenv=require('dotenv');
dotenv.config();
const PORT=process.env.PORT || 3000;
const app=express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.post('/shorten',async(req,res)=>{
    const {url}=req.body;
    const short_id=nanoid(6);
    await db.query(
        'INSERT INTO urls (original_url, short_id) VALUES (?,?)',[url,short_id]
    );
    const shortUrl=`http://localhost:${PORT}/${short_id}`;
    return res.json({shortUrl});
    
});
app.get('/:shortid',async(req,res)=>{
    const { shortid } = req.params;
    const [rows]=await db.query(
        'SELECT * FROM urls WHERE short_id=?',[shortid]
    );
    if (rows.length === 0)
    {
        return res.status(404).send("Not Found");
    }
    res.redirect(rows[0].original_url);
});

app.listen(PORT,()=>{
    console.log(`Server is running at  http://localhost:${PORT}`)
})