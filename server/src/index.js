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

  const insertStatement = db.prepare('INSERT INTO names (vornamen, geschlecht) VALUES (?, ?)');
  rows.forEach(row => {
    const [vorname, geschlecht] = row.split(';');
    insertStatement.run(vorname, geschlecht.trim());
  });
  insertStatement.finalize();

  // Route um Daten aus der Datenbank abzurufen
  route.get('/getDataFromDatabase', (req, res) => {
    db.all('SELECT * FROM names', (error, rows) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(rows);
    });
  });

  // Daten ausgeben kann gelöscht werden
  db.each('SELECT * FROM names', (error, row) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`${row.vornamen} - ${row.geschlecht}`);
  });
});

dbMerkliste.serialize(() => {
  dbMerkliste.run('CREATE TABLE IF NOT EXISTS merkliste (vornamen TEXT, geschlecht TEXT)');

  const insertStatement = dbMerkliste.prepare('INSERT INTO merkliste (vornamen, geschlecht) VALUES (?, ?)');
  insertStatement.run('vorname', 'geschlecht');

  insertStatement.finalize();

  // Route um Daten aus der Datenbank abzurufen
  route.get('/getMerklisteFromDatabase', (req, res) => {
    dbMerkliste.all('SELECT * FROM merkliste', (error, rows) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(rows);
    });
  });
});

route.put('/addToMerkliste', (req, res) => {
  const { vorname, geschlecht } = req.body;

  // Check if the name already exists in dbMerkliste
  dbMerkliste.get('SELECT * FROM merkliste WHERE vornamen = ? AND geschlecht = ?', [vorname, geschlecht], (selectError, existingRow) => {
    if (selectError) {
      console.error(selectError);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (existingRow) {
      // Name already exists
      res.json({ message: 'Name already exists in Merkliste.' });
      console.log(vorname + ' exsistiert bereits in Merkliste.');
    } else {
      // Name doesn't exist, proceed with insertion
      dbMerkliste.run('INSERT INTO merkliste (vornamen, geschlecht) VALUES (?, ?)', [vorname, geschlecht], (insertError) => {
        if (insertError) {
          console.error(insertError);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: 'Name wurde zur Merkliste hinzugefügt.' });
        console.log(vorname + ' hinzugefügt');
      });
    }
  });
});

route.post('/deleteFromMerkliste', (req, res) => {
  const { vorname, geschlecht } = req.body;

  dbMerkliste.run('DELETE FROM merkliste WHERE vornamen = ? AND geschlecht = ?', [vorname, geschlecht], (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Name wurde aus der Merkliste gelöscht.' });
    console.log(vorname + ' aus Merkliste gelöscht');
  });
});

module.exports = route;
