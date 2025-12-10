const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');
const routes = require('./routes');
const requestContext = require('./middleware/request-context');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found');
const auth = require('./middleware/auth');

const app = express();

app.use(requestContext);
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

const basePaths = Array.from(
  new Set([config.apiBasePath || '/api/v1', '/api/v1'])
).filter(Boolean);

if (!basePaths.includes('/')) {
  basePaths.push('/');
}

app.get(['/api/v1/health', '/health'], (_req, res) => {
  res.json({ status: 'ok', service: 'bluebird-api', env: config.env });
});

app.use(['/api/v1', '/'], auth, routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
