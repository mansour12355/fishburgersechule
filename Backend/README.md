# DevSync Dashboard - Backend

Node.js + Express backend server for the DevSync scheduling dashboard.

## Features

- Serves the frontend static files
- RESTful API for tasks, messages, and activities
- Firebase Admin SDK integration (optional)
- Health check endpoint

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. (Optional) For server-side Firebase, add your service account key:
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `routes/serviceAccountKey.json`

## Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Send a message |
| GET | `/api/activities` | Get activities |
| POST | `/api/activities` | Add activity |

## Note

The frontend uses client-side Firebase by default. The server-side API is optional and useful for:
- Server-side rendering
- Additional security rules
- Background jobs
- Webhooks
