import mysql from "mysql2";
// import open from "open";
import fs from "fs";
import os from "os";
import path from "path";

const Functions= {
  async VolLogin(Volunteer_ID_check, Volunteer_Pass_check) {
    return new Promise((resolve, reject) => {
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
                reject(error);
            }

            const idList = [];
            const passList = [];
            results.forEach(row => {
                idList.push(row['Volunteer_ID']);
                passList.push(row[`Volunteer_Pass`]);
            });
            connection.end();

            const idIndex = idList.indexOf(Volunteer_ID_check);
            const passIndex = passList.indexOf(Volunteer_Pass_check);


            let ID_exist = false;
            if (idList.includes(Volunteer_ID_check) && passList.includes(Volunteer_Pass_check) && idIndex !== -1 && passIndex !== -1 && idIndex === passIndex) {
                ID_exist = true;
                console.log(`Corect password`);
            } else {
                ID_exist = false;
                console.log(`Your ID or passowrd is invalid`);
            }

            resolve(ID_exist); // Resolve with ID_exist value
        });
    });
 },
 async VolSignup(idValue, nameValue, ageValue, phoneValue, passValue) {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'database_shvavhav'
      });
      connection.connect();

      const dataToInsert = {
          Volunteer_ID: parseInt(idValue, 10),
          volunteer_Name: nameValue,
          Color: 'Green',
          Age: ageValue,
          Volunteer_Phone: phoneValue,
          Volunteer_Pass: passValue,
      };

      const query = `INSERT INTO Volunteer_info SET ?`;

      connection.query(query, dataToInsert, (error, results) => {
          connection.end(); // Close the connection in both success and error cases
          if (error) {
              console.error('Error inserting data:', error);
              return reject(error); // Reject the promise with the error
          }
          console.log('Data inserted successfully:', results);
          resolve(results); // Resolve the promise with the results
      });
  });
 },
 async AnimInsert(idValue, nameValue, ageValue, medInfoPath) { //receives all dog values and inserts
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
 async VolInfo(volID) { //recieves id of volunteer and returns the entire line of information
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database_shvavhav'
      });

      connection.query(
        'SELECT * FROM Volunteer_info WHERE Volunteer_ID = ?',
        [volID],
        (error, results, fields) => {
            if (error) {
                console.error('Error selecting data:', error);
                reject(error);
            } else {
                if (results.length === 0) {
                    console.log(`No row found with Volunteer_ID=${volID}`);
                    resolve(null); // Resolve with null when no row is found
                } else {
                    const rowData = results[0];
                    const valuesArray = Object.values(rowData);
                    console.log('Selected row values:', valuesArray);
                    resolve({
                      'Volunteer_ID': valuesArray[0],
                      'name': valuesArray[1],
                      'color': valuesArray[2],
                      'age': valuesArray[3],
                      'phoneNumber': valuesArray[4],
                    });
                 }
             }
        }
      );
    connection.end(); // Close connection after query
  });
 },
  async AnimInfo(AnimID) { //receives animal id and returns the info of the animal exept pds. it works with get.
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
  async openMedInfo(AnimID){ //receives the animal id and opens their medical pdf info
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
  async deleteAnim(AnimID){ //receives animal id and deletes that row
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
  async findAnimalsByColor(color) { //receives color and returns the ids of all dogs corresponding to the color
    return new Promise((resolve, reject) => {
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
          connection.end();
          reject(error); // Reject the promise if an error occurs
        } else {
          if (results.length === 0) {
            console.log(`No row found with Animal_ID=${color}`);
            resolve([]); // Resolve with an empty array if no rows are found
          } else {
            const numbersArray = results.map(({ Animal_ID }) => Animal_ID);
            console.log('Selected rows:', numbersArray);
            resolve(numbersArray); // Resolve with the array of Animal_IDs
          }
        }
        connection.end();
      });
    });  
  },
  async TripInsert(VolID,AnimID,LeaveTime,ReturnTime,Type){ //inserts a trip 
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'database_shvavhav',
      timezone: 'Z'
    });
    connection.connect();
    const tableName = 'Trips';
  
    const dataToInsert = {
      Volunteer_ID: parseInt(VolID,10),
      Animal_ID: parseInt(AnimID,10),
      Left: LeaveTime,
      Return: ReturnTime,
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
  async deleteVol(VolID){ //receives volunter id and deletes its row
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
  async SchedInsert(VolID, Arrival) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'database_shvavhav',
            timezone: 'Z'
        });
        connection.connect();

        const dataToInsert = {
            Volunteer_ID: parseInt(VolID, 10),
            Arrival_Time: Arrival,
        };

        const query = `INSERT INTO Arrival SET ?`;

        connection.query(query, dataToInsert, (error, results) => {
            if (error) {
                console.error('Error inserting data:', error);
                connection.end();
                reject(error); // Reject the promise if an error occurs
            } else {
                console.log('Data inserted successfully:', results);
                connection.end();
                resolve(results); // Resolve with the results of the insertion
            }
        });
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
  async leastrecent(){ //returns the 
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
          ORDER BY MAX(Returned) ASC
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
  },
  async updateColumn(tableName, columnName, value, idColumnName, idValue) {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'database_shvavhav',
        timezone:'Z',
      });
  
      connection.connect();
  
      const query = `UPDATE ${tableName} SET ${columnName} = ? WHERE ${idColumnName} = ?`;
  
      connection.query(query, [value, idValue], (error, results) => {
        if (error) {
          console.error('Error updating data:', error);
          connection.end();
          reject(error); // Reject the promise if an error occurs
        } else {
          console.log(`Updated ${columnName} for row with ${idColumnName} ${idValue}`);
          connection.end();
          resolve(results); // Resolve with the results of the update operation
        }
      });
    });
  },
  async getSchedule(period) { //recieves either the word "Week" or the word "Day" and returns an array of the arrival of volunteers
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'database_shvavhav',
            timezone: 'Z',
        });

        connection.connect();
        
        const currentDate = new Date();
        let startDate;
        let endDate;

        if (period === 'week') {
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the current week
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // End of the current week
        } else if (period === 'day') {
            startDate = new Date(currentDate);
            startDate.setHours(0, 0, 0, 0); // Start of the current day
            endDate = new Date(currentDate);
            endDate.setHours(23, 59, 59, 999); // End of the current day
        } else {
            reject(new Error('Invalid period. Please specify "week" or "day".'));
            return;
        }

        const query = `
            SELECT *
            FROM Arrival
            WHERE Arrival_Time BETWEEN ? AND ?
        `;

        connection.query(query, [startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10)], (error, results) => {
            if (error) {
                console.error('Error fetching schedule:', error);
                connection.end();
                reject(error); // Reject the promise if an error occurs
            } else {
              console.log(`Schedule for the ${period}:`, results);
              const simplifiedResults = results.map(row => [row.Volunteer_ID, row.Arrival_Time]);
              connection.end();
              resolve(simplifiedResults); // Resolve with the simplified array of schedule entries
            }
        });
    });
  },
  async updateOrInsertTrip(volunteerId, animalId, type) {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'database_shvavhav'
        });

        // First, check if a trip exists with NULL Returned time
        const checkQuery = `
            SELECT * FROM Trips 
            WHERE Volunteer_ID = ? AND Animal_ID = ? AND Returned IS NULL
        `;

        connection.query(checkQuery, [volunteerId, animalId], (checkError, checkResults) => {
            if (checkError) {
                console.error('Error checking trip data:', checkError);
                connection.end();
                reject(checkError);
                return;
            }

            if (checkResults.length > 0) {
                // Trip exists, update it
                const updateQuery = `
                    UPDATE Trips
                    SET \`Left\` = IFNULL(\`Left\`, NOW()), 
                        Returned = IF(\`Left\` IS NULL, NULL, IFNULL(Returned, NOW())), 
                        Type = IFNULL(Type, ?)
                    WHERE Volunteer_ID = ? AND Animal_ID = ?
                `;
                connection.query(updateQuery, [type, volunteerId, animalId], (updateError, updateResults) => {
                    if (updateError) {
                        console.error('Error updating trip data:', updateError);
                        connection.end();
                        reject(updateError);
                    } else {
                        console.log('Trip data updated successfully:', updateResults);
                        connection.end();
                        resolve(updateResults);
                    }
                });
            } else {
                // No such trip exists, insert a new trip
                const insertQuery = `
                    INSERT INTO Trips (Volunteer_ID, Animal_ID, \`Left\`, Type)
                    VALUES (?, ?, NOW(), ?)
                `;
                connection.query(insertQuery, [volunteerId, animalId, type], (insertError, insertResults) => {
                    if (insertError) {
                        console.error('Error inserting trip data:', insertError);
                        connection.end();
                        reject(insertError);
                    } else {
                        console.log('Trip data inserted successfully:', insertResults);
                        connection.end();
                        resolve(insertResults);
                    }
                });
            }
        });
    });
},
async getTodaysTrips() {
  return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'database_shvavhav'
      });

      connection.connect(error => {
          if (error) {
              console.error('Error connecting to the database:', error);
              reject(error);
              return;
          }

          const today = new Date().toISOString().slice(0, 10);

          const query = `
              SELECT Volunteer_ID, Animal_ID, \`Left\`, Returned
              FROM Trips
              WHERE DATE(\`Left\`) = ? AND \`Returned\` IS NOT NULL
          `;

          connection.query(query, [today], (error, results) => {
              if (error) {
                  console.error('Error fetching trips:', error);
                  connection.end();
                  reject(error);
              } else {
                  console.log('Today\'s trips:', results);
                  connection.end();
                  resolve(results);
              }
          });
      });
  });
}
}
export default Functions; //exports all of the functions as the default import of the file