# Startup Idea Evaluator — Backend

This backend is a Node + Express TypeScript service that forwards incoming idea evaluations
to four AI agent endpoints (configurable) and returns aggregated results for the frontend.

## Quick start

1. Copy `.env.example` to `.env` and set your agents' URLs and keys.
2. `npm install`
3. `npm run dev` to start in development
4. POST to `http://localhost:8080/api/evaluate` with JSON `{ "title": "...", "description": "..." }`

## Expected agent response shape (flexible)

The backend tries to normalize multiple possible response shapes. The recommended response fields
from each agent are:

- `score` (number)
- `summary` (string)
- `strengths` (array of strings)
- `concerns` (array of strings)
- `recommendation` (string)

If your DigitalOcean agents return a different structure, adjust the normalization logic in `src/index.ts`.
