console.log("hello world w/ node mon")

//create server
const express = require('express');

// create web app
const app = express();

//create database variable
const pool = require("./postgres_config");

//sumbit data using form
app.use(express.urlencoded({extended:true}));

// api example
app.get('/',(req,res)=>{
    res.send("hello api");
});

app.post('/post',(req,res)=>{
    res.send("hello world1");
});

//select API
app.get('/useAPI/select', async(req,res)=>{
    const result = await pool.query("SELECT * FROM users");
    res.send(result.rows);
});

//insert API
app.post('/useAPI/insert', async(req,res)=>{
    const result = await pool.query(
        "INSERT INTO users (name, email) VALUES($1, $2)",
        [req.body.name, req.body.email]
    );
    res.send({result: result});
});

//update API
app.put('/useAPI/update/:id', async(req,res)=>{
    const result = await pool.query(
         "UPDATE users SET name = $1, email = $2 WHERE id = $3",
         [req.body.name, req.body.email, req.params.id]
    );
    res.send({result:result});
});

//delete API
app.delete('/useAPI/delete/:id', async(req,res)=>{
    const result = await pool.query(
        "DELETE FROM users WHERE id = $1",
        [req.params.id]
    );
    res.send({result:result});
});

app.listen( 3000, ()=>{
    console.log("server is running")
}
);