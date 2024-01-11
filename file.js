var mysql=require('mysql')

var con=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'root'
});
con.connect((error)=>{
    if(error) throw error;
    console.log("Database connected");
    con.query('CREATE DATABASE library; ',(result,error)=>{
        if (error) throw error;
        else console.log("Successfully created database library")
    });
    return;
});