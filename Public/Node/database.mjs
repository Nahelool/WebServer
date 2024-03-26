import mysql from "mysql2";
// import open from "open";
import fs from "fs";
import os from "os";
import path from "path";

const Functions= {
  async VolLogin(Volunteer_ID_check,Volunteer_Pass_check) { //takes id and password and checks if it exists or not
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
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
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
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
  async AnimInsert(idValue, nameValue, ageValue, medInfoPath) { //takes all dog values and inserts
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();
    const tableName = 'animal_info';
    const medInfo = fs.readFileSync(medInfoPath);

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
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
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
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
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
  },
  async openMedInfo(AnimID){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();

    connection.query(
      'SELECT Animal_Medical_Info FROM ?? WHERE Animal_ID = ?',
      ["Animal_Info", AnimID],
      (error, results) => {
        if (error) {
          console.error('Error fetching PDF data:', error);
          throw error;
        }
    
        if (results.length === 0) {
          console.log('No PDF data found.');
          connection.end();
          return;
        }
    
        const pdfData = results[0].Animal_Medical_Info;
    
        // Save the binary data to a temporary file
        const tempDir = os.tmpdir(); // Get the system's temporary directory
        const tempFileName = 'temp.pdf';
        const tempFilePath = path.join(tempDir, tempFileName);

        fs.writeFile(tempFilePath, pdfData, (writeError) => {
          if (writeError) {
            console.error('Error writing PDF file:', writeError);
            throw writeError;
          }
    
          // Open the temporary file using the default PDF viewer
          open(tempFilePath)
            .then(() => {
              console.log('PDF file opened successfully');
              connection.end();
            })
            .catch((openError) => {
              console.error('Error opening PDF file:', openError);
              connection.end();
            });
        });
      }
    );
  },
  async deleteRow(AnimID){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();

    const query = "DELETE FROM Animal_info WHERE Animal_ID=?";

    connection.query(query, [AnimID], (error, results) => {
      if (error) {
        console.error('Error selecting data:', error);
        throw error;
      }
  
      if (results.length === 0) {
        console.log(`No row found with Animal_ID=${AnimID}`);
      } else {
        console.log('Row deleted with Animal ID =', results[0]);
      }
  
      connection.end();
  });
  }
};
export default Functions;