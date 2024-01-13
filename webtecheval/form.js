
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(express.static(__dirname));
var con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'showroom'
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/addcar', function (req, res) {
    res.send(`
        <html>
        <form action="/savecar" method="POST">
            <label for="carid">carid:</label>
            <input type=number id="carid" name="carid" required><br><br>
            <label for="model">Model:</label>
            <input type="text" id="model" name="model" required><br><br>
            <label for="year">Year:</label>
            <input type="number" id="year" name="year" required><br><br>
            <label for="speed">Speed:</label>
            <input type="number" id="speed" name="speed" required><br><br>
            <label for="price">Price:</label>
            <input type="number" id="price" name="price" required><br><br>
            <label for="custid">custid:</label>
            <input type="number" id="custid" name="custid" required><br><br>
            <input type="submit" value="Add Car">
        </form>
        <div>
        <form action="/deloldcar" method="POST">
            <input type="submit" value="Delete Old Car">
        </form>
        </div>
        </form>
        <div>
        <form action="/displayall" method="POST">
            <input type="submit" value="Display ALL">
        </form>
        <form action="/display2019" method="POST">
            <input type="submit" value="Display cars from 2019">
        </form>
        <form action="/latestmodels" method="POST">
        <input type="submit" value="Display latest models">
    </form>

        </div>
        </html>
    `);
});

// Save car data
app.post('/savecar', urlencodedParser, function (req, res) {
    var carid = req.body.carid;
    var model = req.body.model;
    var year = req.body.year;
    var speed = req.body.speed;
    var price = req.body.price;
    var custid = req.body.custid;

    var sql = `INSERT INTO car (carid, modelname, year, speed, price, custid) VALUES (${carid}, "${model}", ${year}, ${speed}, ${price}, ${custid});`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Car data inserted");
        res.send("Car data inserted");
    });
});
app.post('/deloldcar', urlencodedParser, function (req, res) {
    var sql="select min(year) as year from car;";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Min year selected");
        var year = parseInt(result[0].year);
        console.log(year);
        var sql = `DELETE FROM car WHERE year = ${year};`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Old model deleted");
            res.send("Old model deleted");
        });
    });
});
app.post('/displayall', urlencodedParser, function (req, res) {
    var query="select * from car;";
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("All data selected");
        res.write("<html><body><h1>Displaying all car details</h1><ul>");
        result.forEach(function (row) {
            res.write("<h3><li>Car id: " + row.carid + "    |modelname: " + row.modelname + "    |Year: " + row.year + "    |speed:" + row.speed + "    |price:" + row.price,+ "    |custid:" + row.custid);

            res.write("</li><h3>");
        });
        res.write("</ul></body></html>");


        res.end();
        
    });
    
});
app.post('/display2019', urlencodedParser, function (req, res) {
    var query="select * from car where year=2019;";
    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("All data selected");
        res.write("<html><body><h1>Displaying cars manufactured in 2019</h1><ul>");
        if(result.length==0)
        {
            res.write("<h3><li>No cars manufactured in 2019</li><h3>");
        }
        result.forEach(function (row) {
            res.write("<h3><li>Car id: " + row.carid + "    |modelname: " + row.modelname + "    |Year: " + row.year + "    |speed:" + row.speed + "    |price:" + row.price,+ "    |custid:" + row.custid);

            res.write("</li><h3>");
        });
        res.write("</ul></body></html>");


        res.end();
        
    });
    
});
app.post('/latestmodels', urlencodedParser, function (req, res) {
    var sql = "SELECT * FROM car ORDER BY year DESC LIMIT 5;";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("All data selected");
        res.write("<html><body><h1>Displaying latest 5 cars</h1><ul>");
        if(result.length==0)
        {
            res.write("<h3><li>No cars</li><h3>");
        }
        result.forEach(function (row) {
            res.write("<h3><li>Car id: " + row.carid + "    |modelname: " + row.modelname + "    |Year: " + row.year + "    |speed:" + row.speed + "    |price:" + row.price,+ "    |custid:" + row.custid);

            res.write("</li><h3>");
        });
        res.write("</ul></body></html>");


        res.end();
        
    });
    
});

var port=9000;
app.listen(port, () => {
    console.log(`Server running on port number ${port}`)
});