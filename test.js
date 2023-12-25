import {VolunteerLogin} from './database.js';
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
});
VolunteerLogin(312,`42`);
connection.end();