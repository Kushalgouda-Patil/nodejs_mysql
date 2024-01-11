var mysql=require('mysql');
var con=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'root',
    database:'library',
});

var table_books=`
CREATE TABLE books (
    id int primary key,
    title varchar(25),
    author_id int,
    published_year int,
    foreign key (author_id) references authors(author_id)
);`;
var table_authors=`
CREATE TABLE authors (
    author_id INT primary key,
    author_name VARCHAR(30),
    author_bio VARCHAR(30)
);`;



con.connect(function(err){
    if (err) throw err;
    console.log('Connected to database');
});

con.query(table_authors,(err)=>{
    if(err) throw error;
    console.log("Successfully created table_authors");
});
con.query(table_books,(err)=>{
    if(err) throw error;
    console.log("Successfully created table_books");
});