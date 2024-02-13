import mysql from "mysql2";
import open from "open";
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
  
    try {
      connection.query(
        'SELECT * FROM Volunteer_info WHERE Volunteer_ID = ?',
        [volID],
        (error, results, fields) => {
          if (error) {
            console.error('Error selecting data:', error);
            throw error;
          }
  
          if (results.length === 0) {
            console.log(`No row found with Volunteer_ID=${volID}`);
            return null; // Return null or handle the case when no row is found
          }
  
          const rowData = results[0];
  
          // Convert the object properties to an array of values
          const valuesArray = Object.values(rowData);
  
          console.log('Selected row values:', valuesArray);
          return valuesArray;
        }
      );
    } catch (error) {
      console.error('Error in try-catch block:', error);
    } finally {
      // Ensure the connection is always closed
      connection.end();
    }
  },
  async AnimInfo(AnimID) { //takes animal id and returns the info of the animal exept pds. it works with get.
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'database_shvavhav'
        });
        
        connection.connect();
        
        const query = 'SELECT Animal_ID, Animal_Name, Color, Age FROM Animal_info WHERE Animal_ID=?';
        connection.query(query, [AnimID], (error, results) => {
            if (error) {
                console.error('Error selecting data:', error);
                connection.end();
                reject(error); // Reject the promise if an error occurs
            } else {
                if (results.length === 0) {
                    console.log(`No row found with Animal_ID=${AnimID}`);
                    connection.end();
                    resolve(null); // Resolve with null if no rows are found
                } else {
                    console.log('Animal_info according to the id given:', results[0]);
                    connection.end();
                    resolve(results[0]); // Resolve with the first row if found
                }
            }
        });
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
  async deleteAnim(AnimID){
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
  },
  async findAnimalsByColor(color) {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    const query = `
    SELECT Animal_ID FROM Animal_info WHERE Color=?
    `;
    connection.query(query, [color], (error, results) => {
        if (error) {
          console.error('Error selecting data:', error);
          throw error;
        }

        if (results.length === 0) {
          console.log(`No row found with Animal_ID=${color}`);
        } else {
          const numbersArray = results.map(({ Animal_ID }) => Animal_ID);
          console.log('Selected rows:', numbersArray);
        } 
        connection.end();
    });
  },
  async TripInsert(VolID,AnimID,DateTime,Type){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();
    const tableName = 'Trips';
  
    const dataToInsert = {
      Volunteer_ID: parseInt(VolID,10),
      Animal_ID: parseInt(AnimID,10),
      Date: DateTime,
      Type: Type,
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
  async deleteVol(VolID){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();

    const query = "DELETE FROM Volunteer_info WHERE Volunteer_ID=?";

    connection.query(query, [VolID], (error, results) => {
      if (error) {
        console.error('Error selecting data:', error);
        throw error;
      }
  
      if (results.length === 0) {
        console.log(`No row found with Volunteer_ID=${VolID}`);
      } else {
        console.log('Row deleted with Volunteer_ID =', results[0]);
      }
  
      connection.end();
  });
  },
  async SchedInsert(VolID,Arrival){
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav'
    });
    connection.connect();
    const tableName = 'Arrival';
  
    const dataToInsert = {
      Volunteer_ID: parseInt(VolID,10),
      Arrival_Time: Arrival,
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
  async changeColmn(tableName,ID,change,value,animOrvoll){
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'database_shvavhav'
      });
      connection.connect();
      
      const query = `UPDATE ${tableName} SET ${change} = ? WHERE ${animOrvoll}_ID = ?`;
      connection.query(query, [value, ID], (error, results) => {
          if (error) {
              console.error('Error updating data:', error);
              connection.end();
              reject(error); // Reject the promise if an error occurs
          } else {
              console.log(`Updated ${change} for row with id ${ID}`);
              connection.end();
              resolve(results); // Resolve with the results of the update operation
          }
      });
  });
  },
  async leastrecent(){
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'database_shvavhav'
      });

      connection.connect();

      const query = `
          SELECT Animal_id 
          FROM trips 
          GROUP BY Animal_id 
          ORDER BY MAX(Date) ASC
      `;

      connection.query(query, (error, results) => {
          if (error) {
              console.error('Error selecting data:', error);
              connection.end();
              reject(error); // Reject the promise if an error occurs
          } else {
              const animalIds = results.map(row => row.Animal_id);
              console.log('Animal IDs ordered by least recent:', animalIds);
              connection.end();
              resolve(animalIds); // Resolve with the array of animal IDs
          }
      });
  });
  }
}
export default Functions;