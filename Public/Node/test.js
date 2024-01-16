import Functions from "./database.js";
import mysql from "mysql2";
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
  });

//Functions.openMedInfo(60);
//Functions.AnimInfo(3);
Functions.deleteRow(6)
//Functions.AnimInsert(60,"orball",54,"C:/Users/user/Documents/hello.pdf");
connection.end();