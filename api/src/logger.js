const pino = require('pino');
const config = require('./config');

const logger = pino({
  level: config.env === 'production' ? 'info' : 'debug',
  transport:
    config.env === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            translateTime: 'SYS:standard',
          },
        },
});

module.exports = logger;
