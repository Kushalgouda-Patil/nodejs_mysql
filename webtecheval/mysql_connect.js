var mysql=require('mysql')

var con=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'root'
});
con.connect((error)=>{
    if(error) throw error;
    console.log("Database connected");
    con.query('CREATE DATABASE showroom;',(result,error)=>{
        if (error) throw error;
        else console.log("Successfully created database showroom")
    });
    return;
});