//  load the things we need
const path = require('path');
const express = require('express');

// Standardport
const port = '8080';

//  Server Erstellung
const server = express();
server.use(express.static(path.join(__dirname, '..', '..', 'webapp', 'dist')));

//  Server Starten
server.listen(port);
console.log('Der Sever läuft auf Port' + port);
