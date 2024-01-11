var mysql=require('mysql');
var express=require('express');
var {addauthors,query_addauthors,render_authors}=require('./lib.js');

var con=mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    database:'library'
});
con.connect((error)=>{
    if(error) throw error;
    console.log("Database connected");
});
var app=express();
app.use(express.urlencoded({ extended: true }));
var port=9000;
app.get('/',(req,res)=>{
    res.send(addauthors)
});
app.post('/addauthors',(req,res)=>{
    const { aid, aname, abio } = req.body;
    query_addauthors(aid,aname,abio,con);
    res.send("Success");
    // Now you should have the values
    
});
app.get('/authors',(req,res)=>{
    console.log(render_authors(con));
    res.send(render_authors(con));
});
app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
  });
