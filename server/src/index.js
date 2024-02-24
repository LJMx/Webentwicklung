const fs = require('fs');
const sqlite3 = require('sqlite3');
const express = require('express');
const route = new express.Router();
route.use(express.json());

// Datenbank für alle Namen
const db = new sqlite3.Database(':memory:');

// Datenbank für Merkliste
const dbMerkliste = new sqlite3.Database(':memory:');

// CSV lesen und einfügen
const csvData = fs.readFileSync('data/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv', 'utf-8');
const rows = csvData.trim().split('\n');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS names (vornamen TEXT, geschlecht TEXT)');

  const sqlCommand = db.prepare('INSERT INTO names (vornamen, geschlecht) VALUES (?, ?)');
  rows.forEach(row => {
    const [vorname, geschlecht] = row.split(';');
    sqlCommand.run(vorname, geschlecht.trim());
  });
  sqlCommand.finalize();

  // Route um Daten aus der Datenbank abzurufen
  route.get('/getData', (req, res) => {
    db.all('SELECT * FROM names', (error, rows) => {
      if (error) {
        console.error(error);

        return;
      }
      res.json(rows);
    });
  });
});

dbMerkliste.serialize(() => {
  dbMerkliste.run('CREATE TABLE IF NOT EXISTS merkliste (vornamen TEXT, geschlecht TEXT)');

  const sqlCommand = dbMerkliste.prepare('INSERT INTO merkliste (vornamen, geschlecht) VALUES (?, ?)');

  sqlCommand.finalize();

  // Route um Daten aus der Datenbank abzurufen
  route.get('/getMerkliste', (req, res) => {
    dbMerkliste.all('SELECT * FROM merkliste', (error, rows) => {
      if (error) {
        console.error(error);

        return;
      }
      res.json(rows);
    });
  });
});

route.put('/addToMerkliste', (req, res) => {
  const { vorname, geschlecht } = req.body;

  dbMerkliste.run('INSERT INTO merkliste (vornamen, geschlecht) VALUES (?, ?)', [vorname, geschlecht], (insertError) => {
    res.json({ message: 'Name wurde zur Merkliste hinzugefügt.' });
    console.log(vorname + ' hinzugefügt zu Merkliste');
  });
});

route.post('/deleteFromMerkliste', (req, res) => {
  const { vorname, geschlecht } = req.body;

  dbMerkliste.run('DELETE FROM merkliste WHERE vornamen = ? AND geschlecht = ?', [vorname, geschlecht], (error) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json({ message: 'Name wurde aus der Merkliste gelöscht.' });
    console.log(vorname + ' gelöscht von Merkliste');
  });
});

module.exports = route;
