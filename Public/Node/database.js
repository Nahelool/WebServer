import mysql2 from '../../node_modules/mysql2/promise.js'
import express from '../../node_modules/express'
const app = express();


app.get('*.js', (req, res) => {
  res.type('text/javascript');
  res.sendFile(path.resolve(__dirname, '../Node/database.js'));
});

app.use(express.static('Public', { type: "text/html" }));

app.listen(5500, () => {
  console.log('Server is running on port 5500');
});

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_shvavhav'
});
const Functions= {
  async VolLogin(Volunteer_ID_check,Volunteer_Pass_check) { //takes id and password and checks if it exists or not
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
  },
  async VolSignup(idValue, nameValue, ageValue, phoneValue, passValue) { //takes all vol values and inserts
    connection.connect();
    const tableName = 'Volunteer_info';
  
    const dataToInsert = {
      Volunteer_ID: parseInt(idValue,10),
      volunteer_Name: nameValue,
      Color: `Green`,
      Age: ageValue,
      Volunteer_Phone: parseInt(phoneValue, 10),
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
  },
  async AnimInsert(idValue, nameValue, ageValue, medInfo) { //takes all dog values and inserts
    connection.connect();
    const tableName = 'animal_info';
  
    const dataToInsert = {
      Animal_ID: parseInt(idValue,10),
      Animal_Name: nameValue,
      Color: `Green`,
      Age: ageValue,
      Animal_Medical_Info:medInfo,
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
  },
  async VolInfo(volID) { //takes volunteer id and returns all info in the row
    connection.connect();
    const query = `
    SELECT *
    FROM Volunteer_info
    WHERE Volunteer_ID=?
    `;
    connection.query(query, [volID], (error, results) => {
        if (error) {
          console.error('Error selecting data:', error);
          throw error;
        }
    
        if (results.length === 0) {
          console.log(`No row found with Volunteer_ID=${volID}`);
        } else {
          console.log('Selected row:', results[0]);
        }
    
        connection.end();
    });
  },
  async AnimInfo(AnimID) { //takes dog id and returns all info in the row
    connection.connect();
    const query = `
    SELECT *
    FROM Animal_info
    WHERE Animal_ID=?
    `;
    connection.query(query, [AnimID], (error, results) => {
        if (error) {
          console.error('Error selecting data:', error);
          throw error;
        }
    
        if (results.length === 0) {
          console.log(`No row found with Volunteer_ID=${AnimID}`);
        } else {
          console.log('Selected row:', results[0]);
        }
    
        connection.end();
    });
  }
};
export default Functions;