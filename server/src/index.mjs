import { MongoClient } from 'mongodb';
import fs from 'fs';
import csvParser from 'csv-parser';

(async function () {
  let client = null;

  try {
    client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }

  try {
    const db = client.db('datenbank');
    const collection = db.collection('names');

    // CSV Dateipfad
    const csvFilePath = 'data/Gesamt_Vornamen_Koeln_2010_2022_cleaned.csv';

    // CSV lesen
    const csvStream = fs.createReadStream(csvFilePath)
      .pipe(csvParser());
    const documents = [];
    csvStream.on('data', (data) => {
      // Aufbau der Datenbank
      const document = {
        names: data.names,
        gender: data.gender
      };
      documents.push(document);
    });

    csvStream.on('end', async () => {
      await collection.insertMany(documents); // Muss noch angepasst werden
      console.log('Daten wurden eingefügt');
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
})();
