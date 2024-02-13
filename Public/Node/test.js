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
//Functions.AnimInfo(60);
//Functions.AnimInsert(60,"orball",54,"C:/Users/user/Documents/hello.pdf");
//Functions.findAnimalsByColor('Green');
//Functions.TripInsert(3,5,"2024-01-02 09:32:49","Garden");
//Functions.SchedInsert(3,"2023-03-23 12:00:00");
//Functions.changeColmn('Animal_info',5,'Color','Yellow','Animal');
Functions.leastrecent();
connection.end();