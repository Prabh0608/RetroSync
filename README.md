# 🚀 RetroSync

A production-ready, real-time Agile Retrospective tool built to help remote teams collaborate effortlessly. Teams can create rooms, brainstorm ideas on drag-and-drop sticky notes, vote on items, and see updates synchronize instantly across all clients.

---

## ✨ Features

- **Instant Real-Time Sync:** Powered by WebSockets for instantaneous multi-user collaboration.
- **Persistent Rooms:** Agile boards are stored permanently using Mongoose schemas.
- **Interactive Fluid Layout:** Smooth interactive behaviors built across frontend viewports.
- **Secure Environment Isolation:** Decoupled architecture with strict production environment variable configurations.

---

## 🛠️ Tech Stack

| Layer          | Technology                 | Usage                                                      |
| :------------- | :------------------------- | :--------------------------------------------------------- |
| **Frontend**   | React (Vite)               | Component-driven UI framework                              |
| **Styling**    | Inline CSS & Global Mixins | Clean modern styling layouts                               |
| **Real-time**  | Socket.io                  | Bidirectional event-driven communication                   |
| **Backend**    | Node.js / Express          | Robust REST routing & server controllers                   |
| **Database**   | MongoDB & Mongoose         | Cloud document store with object data modeling             |
| **Deployment** | Vercel & Render            | Decoupled client-server static and cloud container hosting |

---

## 🏗️ Architecture Layout

```text
RetroSync/
├── backend/            # Express server, Socket.io events, & Mongoose schemas
│   ├── config.env      # Local sensitive credentials (ignored by Git)
│   ├── index.js        # Server initialization & gateway listeners
│   └── models/         # Database models (e.g., Note.js)
│
└── frontend/           # Vite React SPA client application
    ├── src/            # Component lifecycle logic
    │   ├── components/ # Modular presentation UI
    │   └── context/    # Global shared state hook wrappers
    └── dist/           # Production minified bundle destination
```

````

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas)

### 1. Backend Setup

1. Navigate to the backend directory:

```bash
   cd backend

```

2. Install dependencies:

```bash
   npm install

```

3. Create a `config.env` file in the `backend/` root directory:

```env
   DATABASE_PASS=your_mongodb_cluster_password

```

4. Fire up the local development server:

```bash
   npm start

```

### 2. Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd frontend

```

2. Install dependencies:

```bash
   npm install

```

3. Launch the development server:

```bash
   npm run dev

```

4. Open your browser to `http://localhost:5173`.

---

## 🌐 Production Deployments

- **Live Client Link:** [https://retro-sync-olive.vercel.app](https://retro-sync-olive.vercel.app)
- **API Socket Server:** Hosted securely via automated Render web app container pipelines.

> 💡 **Note on Free-Tier Hosting:** The backend server is hosted on a free cloud container. If the application has been inactive, it may take roughly 50-60 seconds for the engine instance to spin up on your first connection request.

```

```
````
