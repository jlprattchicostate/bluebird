const serverless = require('serverless-http');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require('@aws-sdk/client-secrets-manager');

const isOffline = process.env.IS_OFFLINE === 'true' || process.env.NODE_ENV === 'development';
const secretId = process.env.AWS_SECRETS_MANAGER_SECRET_ID;

let handlerPromise;
let secretsPromise;

async function loadSecretsFromAws() {
  if (isOffline || process.env.SECRETS_LOADED === 'true') {
    return;
  }

  if (!secretId) {
    throw new Error('AWS_SECRETS_MANAGER_SECRET_ID env var is required when running in AWS');
  }

  if (!secretsPromise) {
    secretsPromise = (async () => {
      const client = new SecretsManagerClient({
        region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
      });

      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: secretId,
        })
      );

      const secretPayload =
        response.SecretString ||
        Buffer.from(response.SecretBinary, 'base64').toString('utf8');

      let parsedSecrets;
      try {
        parsedSecrets = JSON.parse(secretPayload);
      } catch (error) {
        throw new Error('Secrets Manager secret must be valid JSON');
      }

      for (const [key, value] of Object.entries(parsedSecrets)) {
        if (process.env[key] === undefined) {
          process.env[key] = value;
        }
      }

      process.env.SECRETS_LOADED = 'true';
    })();
  }

  return secretsPromise;
}

async function getHandler() {
  if (!handlerPromise) {
    handlerPromise = (async () => {
      await loadSecretsFromAws();
      const app = require('./src/app');
      return serverless(app);
    })();
  }

  return handlerPromise;
}

exports.handler = async (event, context = {}) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const handler = await getHandler();
  return handler(event, context);
};
