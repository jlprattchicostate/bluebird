# Deployment Reference

This document tracks the live AWS resources and the command(s) required to redeploy the Bluebird API.

## Environment

| Setting | Value |
| --- | --- |
| AWS Region | `us-west-1` |
| Stage | `dev` (default HTTP API stage) |
| Serverless Service | `bluebird-api` |

## Live Resources

| Resource | Identifier | Notes |
| --- | --- | --- |
| Lambda function name | `bluebird-api-dev-api` | Handler `src/lambda.handler` (Node.js 20.x, 512 MB, 30 s timeout). |
| HTTP API (API Gateway v2) ID | `hmm0kkp3g0` | Deployed with `$default` auto-deploy stage. |
| HTTP API base URL | `https://hmm0kkp3g0.execute-api.us-west-1.amazonaws.com` | All Express routes are proxied through this base URL. |

## Deployment Commands

All commands are run from the `api/` directory.

1. Install dependencies (first-time or after updates):
   ```bash
   npm install
   ```
2. Deploy the stack via the Serverless Framework:
   ```bash
   npm run deploy
   ```
   Equivalent raw command:
   ```bash
   npx serverless deploy --stage dev
   ```
3. Inspect the deployed endpoints and resources (optional verification):
   ```bash
   npx serverless info --stage dev
   ```

## Supabase

The Bluebird API connects to Supabase using environment variables loaded at runtime.

| Setting | Value / Source |
| --- | --- |
| Supabase URL | `https://main.d1jaxwhav3ibk1.amplifyapp.com/` |
| `SUPABASE_URL` | Must be set to the Supabase URL in the runtime environment (local `.env`, AWS Secrets Manager, etc.). |
| `SUPABASE_SECRET_KEY` | Required; configured in environment/Secrets Manager, never committed to source control. |
| `SUPABASE_PUBLISHABLE_KEY` | Optional; used by the API if present. |

On Lambda, these values are injected via the `SECRETS_ID` secret (AWS Secrets Manager). Locally, they are read from your `.env` file via `dotenv`.

Keep this file updated whenever resources, regions, or Supabase settings change to ensure future deployments have accurate identifiers.
