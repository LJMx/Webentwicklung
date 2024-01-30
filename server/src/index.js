const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');
const server = new express.Router();

// Datenbank erstellen
const db = new sqlite3.Database(':memory:');

// CSV lesen und einfügen
const csvData = fs.readFileSync('data/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv', 'utf-8');
const rows = csvData.trim().split('\n');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS names (vornamen TEXT, geschlecht TEXT)');

  const insertStatement = db.prepare('INSERT INTO names (vornamen, geschlecht) VALUES (?, ?)');
  rows.forEach(row => {
    const [vorname, geschlecht] = row.split(';');
    insertStatement.run(vorname, geschlecht.trim());
  });
  insertStatement.finalize();

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

  module.exports = server;

  // Daten ausgeben kann gelöscht werden
  db.each('SELECT * FROM names', (error, row) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`${row.vornamen} - ${row.geschlecht}`);
  });
});
