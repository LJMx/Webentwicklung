import fs from 'fs';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:');

// Datenbank erstellen
db.serialize(() => {
  db.run('CREATE TABLE names (vornamen TEXT, geschlecht TEXT)');

  // CSV lesen und einfügen
  const csvData = fs.readFileSync('data/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv', 'utf-8');
  const rows = csvData.trim().split('\n');

  const insertStatement = db.prepare('INSERT INTO names (vornamen, geschlecht) VALUES (?, ?)');
  rows.forEach(row => {
    const [vorname, geschlecht] = row.split(';');
    insertStatement.run(vorname, geschlecht.trim());
  });
  insertStatement.finalize();

  // Kann gelöscht werden wenn alles klappt
  db.each('SELECT * FROM names', (error, row) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`${row.vornamen} - ${row.geschlecht}`);
  });
});
