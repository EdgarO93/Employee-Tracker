// Import and require mysql2
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'BearsWinOnSunday!',
      database: 'courses_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  // to throw error if needed
  db.connect(function (err){
    if (err) throw(err);
  })

module.exports = db;
