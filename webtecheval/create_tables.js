var mysql = require ('mysql');

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"showroom"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Connected");
    var sql="CREATE TABLE customer (custid int(10) primary key,custname varchar(30),addr varchar(50),age int(3))";
    con.query(sql,function (err,result){
        if (err) throw err;
        console.log("Table Customer Created");
    });
    var sql="CREATE TABLE car (carid int(10) primary key,modelname varchar(30),year int(4),speed int(6),price int(10),custid int(10),foreign key(custid) references customer(custid))";
    con.query(sql,function (err,result){
        if (err) throw err;
        console.log("Table car Created");
    });
});



