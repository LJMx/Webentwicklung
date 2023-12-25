//  load the things we need
const path = require('path');
const express = require('express');

// Standardport
let port = '8080';

// Falls ein Port per Kommandozeile übergeben wurde, soll dieser genommen werden.
if (process.argv.length >= 3 && !isNaN(process.argv[2])) {
  port = process.argv[2];
}

//  Server Erstellung
const server = express();
server.use(express.static(path.join(__dirname, '..', '..', 'webapp', 'dist')));

//  Server Starten
server.listen(port);
console.log('Der Sever läuft auf Port' + port);
