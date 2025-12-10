# Bluebird

Bluebird is a mobile-first web app that helps people find the best ski resorts to visit based on weather and road conditions.

## Project Structure

```
/bluebird/
  /client/      # React PWA (Vite)
  /api/         # Express API (Node)
  /supabase/    # SQL migrations + seeds
  /docs/        # PRD, site map, OpenAPI, deployment notes
  README.md
  .gitignore
```

## Tech Stack
- **Frontend:** React (Vite, PWA, mobile-first)
- **Backend:** Express (Node.js)
- **Database:** Supabase (Postgres, migrations)

## Getting Started

1. Clone the repo: `git clone https://github.com/jlprattchicostate/bluebird.git`
2. Install dependencies for each service (instructions to come)
3. Start the development servers (instructions to come)

---

## Live URLs

- **Production Web App (Amplify):** https://main.d1jaxwhav3ibk1.amplifyapp.com/
- **Production API Base URL (AWS HTTP API):** https://hmm0kkp3g0.execute-api.us-west-1.amazonaws.com

See `docs/deployment.md` for Lambda function name, API Gateway ID, and deployment commands.

---

## Directories
- **/client/**: React app source (Vite-powered PWA)
- **/api/**: Express API server
- **/supabase/**: SQL migrations, schema, and seed data
- **/docs/**: Product requirements, site map, API docs, deployment notes

---

## Troubleshooting

- **API returns 500/403 or cannot reach Supabase**  
  - Verify `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `JWT_SECRET` are set in the runtime environment.  
  - In AWS, confirm the Secrets Manager secret (referenced by `SECRETS_ID`) contains these keys.
- **CORS errors in the browser**  
  - The API currently allows origins `https://main.d1jaxwhav3ibk1.amplifyapp.com` and `http://localhost:5173`.  
  - If you use a different origin, update `api/serverless.yml -> provider.httpApi.cors.allowedOrigins` and redeploy.
- **Serverless deploy failures**  
  - Ensure `npm install` has been run in `/api` and AWS credentials are configured.  
  - Use `npm run deploy` from `/api`, then `npx serverless info --stage dev` to verify outputs.

---

## Known Issues

- Authentication and full authorization flows are not yet finalized; some endpoints may run with simplified or disabled auth depending on env configuration.
- Many PRD features (notifications, messaging, rich community tools) are not yet wired end-to-end, even if routes or schemas exist.
- Error handling and rate limiting are minimal; production-hardening work is still pending.

---

## Incomplete / Planned Features

High-level areas still in progress (see `docs/task_list.md` and `docs/PRD.md` for full detail):

- **Home Dashboard** – final UI polish, trending posts, and scheduled data refresh.
- **Weather & Road Updates** – integration with official weather/road APIs and alerting.
- **Resort Conditions & Favorites** – per-resort detail pages and "favorite resorts" UX.
- **Compare Resorts** – side-by-side resort comparison view.
- **Community Feed** – posting, reporting, moderation, and real-time updates.
- **User Profiles & Social** – profiles, follow relationships, and activity views.
- **Messaging & Group Chats** – direct messages and carpool/coordinated trip groups.
- **Push Notifications & Offline Handling** – notification delivery, caching, and degraded connectivity behavior.

---

## License
MIT (add LICENSE file if needed)