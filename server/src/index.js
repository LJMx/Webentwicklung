const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');

// MongoDB-Verbindung
mongoose.connect('mongodb://localhost:27017/Namen', { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB Aufbau
const DatenbankSchema = new mongoose.Schema({
  name: String,
  geschlecht: String
});

const DatenbankModell = mongoose.model('Datenbank', DatenbankSchema);

// Daten werden aus CSV eingefügt
fs.createReadStream('data/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv')
  .pipe(csv())
  .on('data', (row) => {
    const datensatz = new DatenbankModell({
      name: row.name,
      geschlecht: row.geschlecht
    });

    datensatz.save();
  });
