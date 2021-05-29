const mysql = require("mysql");

class Db {
  constructor(database) {
    const dbOptions = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "password",
      database,
    };

    this.database = database;
    this.connection = mysql.createConnection(dbOptions);
  }

  start() {
    return new Promise((resolve, reject) => {
      const onConnect = (err) => {
        if (err) reject(err);
        console.log(
          `Connection to ${this.database} database was successful with id ${this.connection.threadId}`
        );
        resolve();
      };

      this.connection.connect(onConnect);
    });
  }

  end() {
    this.connection.end();
    console.log(
      `Connection to ${this.database} database has been successfully closed.`
    );
  }

  selectAll(tableName) {
    return new Promise((resolve, reject) => {
      const handleQuery = (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };

      this.connection.query(`SELECT * FROM ${tableName}`, handleQuery);
    });
  }

  selectOne() {}

  deleteAll() {}

  deleteOne() {}

  insert() {}

  update() {}
}

module.exports = Db;
