Server (Express + SQLite)

Install and run:

```powershell
cd server
npm install
npm run dev
```

The server listens on port 4000 by default.
DB file is created at `server/data/complaints.db`.

Endpoints:
- GET /complaints
- GET /complaints/:id
- POST /complaints
- PATCH /complaints/:id
- DELETE /complaints/:id
- GET /complaints/analytics/summary
