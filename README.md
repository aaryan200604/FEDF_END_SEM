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

**Postman Collection**

- **Collection file (import into Postman):** https://github.com/aaryan200604/FEDF_END_SEM/blob/main/postman_collection.json
- **Raw download:** https://raw.githubusercontent.com/aaryan200604/FEDF_END_SEM/main/postman_collection.json

To import into Postman:

1. Open Postman → File → Import → Choose Files → select the downloaded `postman_collection.json` (or paste the raw URL).
2. The collection includes tests for: Create, List, Get, Patch, Delete, and Analytics.

Run from the command line using Newman (CLI):

```powershell
# install newman globally once (or use npx)
npm install -g newman

# run the collection (from repo root)
newman run postman_collection.json --disable-unicode
```

The collection will create a complaint, verify CRUD operations, and check the analytics endpoint.
