Smart City Complaints

This workspace includes a simple Express backend and a Vite + React frontend for managing city complaints (GET/POST/PATCH/DELETE) and basic analytics.

- Server: `./server` (runs on port 4000)
- Client: `./client` (vite dev server)

Quick start (PowerShell):

```powershell
# Server
cd server
npm install
npm run dev

# Client (new terminal)
cd client
npm install
npm run dev
```

API endpoints:
- `GET /complaints`
- `GET /complaints/:id`
- `POST /complaints`
- `PATCH /complaints/:id`
- `DELETE /complaints/:id`
- `GET /complaints/analytics/summary`
