# EastGold Admin API

Small standalone backend that powers the hidden `/admin` panel and serves the
live gold rate to the website.

## Run

```bash
cd server
npm install
npm start        # or: npm run dev  (auto-restart on changes)
```

The API listens on `http://localhost:3000`. The frontend's `apiClient` is already
pointed at `http://localhost:3000/api` (see `.env.example` → `VITE_API_BASE_URL`).

## Endpoints

| Method | Path                | Auth        | Body                     |
| ------ | ------------------- | ----------- | ------------------------ |
| POST   | `/api/admin/login`  | none        | `{ username, password }` |
| GET    | `/api/gold-rate`    | none        | —                        |
| PUT    | `/api/gold-rate`    | Bearer JWT  | `{ oneGramRate }`        |

## Admin credentials

Defaults (override with env vars in production):

- Username: `admin`
- Password: `admin@123`

## Configuration (env vars)

| Var              | Default                              |
| ---------------- | ------------------------------------ |
| `PORT`           | `3000`                               |
| `JWT_SECRET`     | `eastgold-admin-secret-change-me`    |
| `ADMIN_USERNAME` | `admin`                              |
| `ADMIN_PASSWORD` | `admin@123`                          |
| `CORS_ORIGINS`   | `http://localhost:5173,http://localhost:4173` |

## Storage

The gold rate persists in `server/data/gold-rate.json` (created on first run,
seeded to ₹9,500 / 1g). This file is gitignored.
