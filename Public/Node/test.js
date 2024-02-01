import Functions from './database.js';
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
});

//VolLogin(69696969,'sean123');
//VolSignup(id,name,age,phone,password)
//VolInfo(69696969)
//Functions.AnimInfo(3) 

connection.end();