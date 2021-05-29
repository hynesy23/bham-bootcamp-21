const mysql = require("mysql");

class DB {
    constructor(database) {
        const dbOptions = {
            host: "localhost",
            user: "root",
            password: "password",
            port: "3306",
            database
        };

        this.database = database;
        this.connection = mysql.createConnection(dbOptions);
    }

    // Add my method for querying below here 
    greeting() {
        console.log("hello from db")
    }

    start() {
        // this.connection.connect( (res)=> console.log(`Connection to ${this.database} database was successful with id ${this.connection.threadId}`));
        return new Promise( ( resolve, reject ) => {
            const onConnect = (err) => {
              if (err) reject(err);
              console.log(
                `Connection to ${this.database} database was successful with id ${this.connection.threadId}`
              );
              resolve("foo");
            };
      
            this.connection.connect(onConnect);
          });
    }

    end( message ) {
        this.connection.end();
        console.log(
            message ||
              `Connection to ${this.database} database has been successfully closed.`
          );
    }

    findAll( tableName )
    {
        return new Promise( ( resolve, reject ) => {
            const handleQuery = ( err, rows ) => {
                if(err) reject (err);
                console.table( rows );
                resolve (rows);  
            }          
            this.connection.query(
                // "SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee", handleQuery
                `SELECT * FROM ${tableName}`, handleQuery
            )
            }) 
    }

    updateById( tableName, roleId, emplyeeId )
    {
        return new Promise( (resolve, reject) => {
            const handleQuery =  (err, rows) => {
                if(err) reject(err);
                console.log( rows );
                resolve("Employee role updated successfully")
            }
            this.connection.query(
                `UPDATE ${tableName} SET role_id = ? WHERE id = ?`, 
                [roleId, emplyeeId], handleQuery
            )
        })
    }

    insert( data, tableName )
    {
        return new Promise( ( resolve, reject ) => {
            const handleQuery = ( err, rows ) => {
                if(err) reject (err);
                console.log( rows );
                resolve(rows);  
            }          
            this.connection.query(
                // "SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee", handleQuery
                `INSERT INTO ${tableName} SET ?`, data, handleQuery
            )
            }) 
    }

    // insertRole

}

module.exports = DB