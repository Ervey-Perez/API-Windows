const sql = require('mssql');


const config = {
    user: "admin",
    password: "Qwerty3001",
    server: "localhost",
    database: "api",
    options: {
        encrypt: false,
        trustServerCertificate: true,      
    }
  };

  //create a MySql pool
//const pool = sql.createPool(config);


//Export the pool
module.exports = config;

