# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in the frontend submodule.

This is the `discord_frontend` submodule of a Discord-clone monorepo. The backend, docker-compose, and shared `.env` live in the parent directory (see its `CLAUDE.md` for cross-cutting concerns).

## Commands

```bash
yarn dev      # next dev (port 3000)
yarn build    # next build
yarn lint     # next lint
yarn format   # prettier on **/*.{js,jsx,ts,tsx,json,html,css,scss}
```

No test runner is configured.

## Architecture

Next.js 13 with the App Router and **experimental Server Actions** enabled (`next.config.js`).

- `src/app/` — routes, including the `(auth)` route group, `channels/`, `invite/`, `restore_pass*`
- `src/components/` — shared UI primitives (`Avatar`, `Button`, `CustomModal`, `VideoConversation`, etc.)
- `src/Redux/` + `src/selectors/` — Redux Toolkit store
- `src/api/` + `src/services/` — axios client with `axios-cache-interceptor`
- `src/actions/` — Next.js Server Actions
- `src/context/`, `src/providers/`, `src/hooks/`, `src/guards/`, `src/libs/`, `src/utils/` — standard cross-cutting helpers
- `src/types/`, `src/contstants.ts` (note the typo — kept for compatibility) — shared TS types and constants

### State management split

- **Redux Toolkit** — client UI state
- **`@tanstack/react-query`** — server-state caching

Don't move server-cache concerns into Redux or vice versa.

### Forms & validation

`react-hook-form` + `@hookform/resolvers`.

### Auth

The backend issues a JWT via `Set-Cookie`. On the frontend, `cookies-next` reads it on both server and client components; `jsonwebtoken` decodes the payload locally. Backend CORS is pinned to `http://localhost:3000` with credentials — keep cross-origin assumptions in mind when changing API hosts.

### Realtime

- **Pusher Channels** (`pusher-js`) — chat/friend events
- **socket.io-client** + **`freeice`** — WebRTC signaling for `VideoConversation`

### Images

`next.config.js` whitelists Cloudinary subdomains via `images.domains`. New image hosts must be added there.
