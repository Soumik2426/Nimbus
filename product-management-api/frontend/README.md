# Product Management Frontend

React, TypeScript, Vite, and Tailwind client for the Product Management API.

## Local development

1. Copy `.env.example` to `.env`.
2. Set `VITE_API_BASE_URL` to `http://localhost:8080/api/v1`.
3. Run `npm install` and `npm run dev`.

The app is served at `http://localhost:5173`.

## Production deployment

Build with `npm run build`. Before deploying to Vercel (or another static host), set the `VITE_API_BASE_URL` environment variable to the public HTTPS backend URL, including `/api/v1`.

Example:

```text
VITE_API_BASE_URL=https://api.example.com/api/v1
```

Do not use `localhost` in the production value: in a browser, it refers to the visitor's machine, not the deployed API. Add the frontend's deployed URL to the backend's `CORS_ALLOWED_ORIGINS` environment variable.
