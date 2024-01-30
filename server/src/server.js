const path = require('path');
const express = require('express');
const indexRouter = require('./index.js');

// Port
const port = 8080;

// dist Verzeichnis auswählen
const server = express();
server.use(express.static(path.join(__dirname, '..', '..', 'webapp', 'dist')));

// Route
server.use('/', indexRouter);

// Server starten
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
