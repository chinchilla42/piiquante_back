/* Importation du package http pour créer le serveur*/
const http = require('http');

/* Importation de l'application */
const app = require('./app');

/* Trouver un port valide */
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

/* Indiquer le bon port à l'application Express */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/* Recherche d'erreurs */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Création du server */
const server = http.createServer(app);

/* Gestion des erreurs */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

/* Ecouter le port disponible */
server.listen(port);
