const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testtec",
});

db.connect((err) => {
  if (err) {
    console.error("Fallo en la coneccion a la DB: " + err);
  } else {
    console.log("Coneccion de manera exitosa");
  }
});

module.exports = db;
