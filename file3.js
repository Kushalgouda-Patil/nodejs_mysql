var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'library',
});

con.connect(function(error){
  if (error) throw error

  console.log('Connected to database');
});


var createEmployeeTable = `
  CREATE TABLE Employee (
    Fname VARCHAR(30),
    Minit CHAR(1),
    Lname VARCHAR(30),
    Ssn VARCHAR(10) PRIMARY KEY,
    Bdate DATE,
    Address VARCHAR(50),
    Sex CHAR(1),
    Salary INT,
    Super_ssn VARCHAR(10),
    Dno INT
  );
`;

var createDepartmentTable = `
  CREATE TABLE Department (
    Dname VARCHAR(30),
    Dnumber INT PRIMARY KEY,
    Mgr_ssn VARCHAR(10),
    Mgr_start_date DATE
  );
`;

var createDepartmentLocationTable = `
  CREATE TABLE Department_Location (
    Dnumber INT,
    Dlocation VARCHAR(30),
    PRIMARY KEY (Dnumber, Dlocation)
  );
`;

var createProjectTable = `
  CREATE TABLE Project (
    Pname VARCHAR(30),
    Pnumber INT PRIMARY KEY,
    Plocation VARCHAR(50),
    Dnum INT
  );
`;

var createWorksOnTable = `
  CREATE TABLE WorksOn (
    Essn VARCHAR(10),
    Pno INT,
    Hours INT,
    PRIMARY KEY (Essn, Pno),
    FOREIGN KEY (Essn) REFERENCES Employee(Ssn),
    FOREIGN KEY (Pno) REFERENCES Project(Pnumber)
  );
`;

const createDependentTable = `
  CREATE TABLE Dependent (
    Essn VARCHAR(10),
    Dependent_name VARCHAR(30),
    Sex CHAR(1),
    Bdate DATE,
    Relationship VARCHAR(30),
    PRIMARY KEY (Essn, Dependent_name),
    FOREIGN KEY (Essn) REFERENCES Employee(Ssn)
  );
`;

con.query(createEmployeeTable,function(error){
  if (error) throw error;

  console.log('Employee table created');
});

con.query(createDepartmentTable, function(error){
  if (error) throw error;

  console.log('Department table created');
});

con.query(createDepartmentLocationTable,function(error){
  if (error) throw error;

  console.log('Department_Location table created');
});

con.query(createProjectTable,function(error){
  if (error) throw error;

  console.log('Project table created');
});

con.query(createWorksOnTable,function(error){
  if (error) throw error;

  console.log('WorksOn table created');
});

con.query(createDependentTable,function(error){
  if (error) throw error;

  console.log('Dependent table created');
});



