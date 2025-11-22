const http = require('http');
const app = require('./app');
const config = require('./config');
const logger = require('./logger');

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info({ port: config.port }, 'API server listening');
});

module.exports = server;
