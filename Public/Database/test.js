import Functions from './database.mjs';
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
});

Functions.VolLogin(215575234,'Yahel100');
//VolSignup(id,name,age,phone,password)
//VolInfo(69696969)
//Functions.AnimInfo(3) 

connection.end();