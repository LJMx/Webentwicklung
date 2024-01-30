const path = require('path');
const express = require('express');
const indexRouter = require('./index.js');

// Port
let port = 8080;

// Falls ein Port per Kommandozeile übergeben wurde, soll dieser genommen werden.
if (process.argv.length >= 3 && !isNaN(process.argv[2])) {
  port = process.argv[2];
}
// dist Verzeichnis auswählen
const server = express();
server.use(express.static(path.join(__dirname, '..', '..', 'webapp', 'dist')));

// Route
server.use('/', indexRouter);

// Server starten
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
