const path = require('path');
const express = require('express');
const sqlite3 = require('sqlite3');

// Port
const port = 8080;

// Datenbank aufrufen
const db = new sqlite3.Database('database.db');

// dist Verzeichnis auswählen
const server = express();
server.use(express.static(path.join(__dirname, '..', '..', 'webapp', 'dist')));

// Route um Daten aus der Datenbank abzurufen
server.get('/getDataFromDatabase', (req, res) => {
  db.all('SELECT * FROM names', (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(rows);
  });
});

// Server starten
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
