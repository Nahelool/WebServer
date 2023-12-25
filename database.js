import mysql from 'mysql2'
import http from 'http'
const port = 3000

//const server = http.createServer(function(req, res){
//    res.write('hi')
//    res.end()
//})


//server.listen(port, function(error) {
//    if (error) {
//        console.log('Something went wrong', error)
//    } else {
//        console.log('Server is listening on port ' + port)
//    }
//})
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
});


export async function VolunteerLogin(Volunteer_ID_check,Volunteer_Pass_check) {
    connection.connect();
    const query = `
    SELECT Volunteer_ID, Volunteer_Pass
    FROM Volunteer_info
    `;

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error fetching data:', error);
            throw error;
        }

        const idList= [];
        const passList= [];
        results.forEach(row => {
            idList.push(row[`Volunteer_ID`])
            passList.push(row[`Volunteer_Pass`])
        });
        connection.end();

        const idIndex = idList.indexOf(Volunteer_ID_check);
        const passIndex = passList.indexOf(Volunteer_Pass_check);

        console.log(Volunteer_ID_check,Volunteer_Pass_check)
        console.log(idList,passList)
        console.log(idIndex,passIndex)

        var ID_exist=false;
        if (idList.includes(Volunteer_ID_check) && passList.includes(Volunteer_Pass_check) && idIndex!=-1 && passIndex!=-1 && idIndex==passIndex) {
            ID_exist=true
            console.log(`It is there let's go`)
        }
        else{
            ID_exist=false
            console.log(`Your name is invalid, activating computer.explode now.`)
        }
    });
};

async function insertVolData(idValue, nameValue, passValue) {
    connection.connect();
    const tableName = 'Volunteer_info';
  
    const dataToInsert = {
      Volunteer_ID: parseInt(idValue,10),
      volunteer_Name: nameValue,
      Color: `Green`,
      Age: 3,
      Volunteer_Email: `gendalf.com`,
      Volunteer_Phone: parseInt(3455, 10),
      Volunteer_Pass: passValue, 
    };
  
    const query = `INSERT INTO ${tableName} SET ?`;
  
    connection.query(query, dataToInsert, (error, results) => {
      if (error) {
        console.error('Error inserting data:', error);
        throw error;
      }
      console.log('Data inserted successfully:', results);
      connection.end();
    });
}

//const idValue = 312;
//const nameValue = 'value2';
//const passValue = '42';


//insertVolData(idValue, nameValue, passValue);
//VolunteerLogin(4312,`thatsme`);