# NexusForge

### Real-Time Collaborative Coding Platform for Competitive Programmers

NexusForge is a modern collaborative programming platform designed for competitive coding teams. It enables multiple programmers to work together in shared coding rooms with real-time synchronization, integrated code execution, contest-focused workflows, and AI-assisted collaboration.

Built to replicate the experience of pair programming and team contests, NexusForge combines live collaboration, coding workspace management, and competitive programming tools into a single platform.

---

## Key Features

### Real-Time Collaboration
- Multi-user coding rooms
- Live code synchronization using Socket.IO
- Real-time cursor presence tracking
- Room invitation and joining system
- Shared collaborative workspace

### Integrated Code Execution
- C++17 support
- Python support
- Custom input execution
- Fast backend compilation and runtime environment

### Competitive Programming Workspace
- Contest-oriented room structure
- Activity tracking and recent room history
- Codeforces account integration
- Collaborative problem-solving environment

### AI-Assisted Workflow
- Dedicated AI Copilot architecture
- Extensible problem-analysis pipeline
- Future-ready intelligent coding assistance

### Modern Dashboard
- Personalized command center
- Connected coding profiles
- Room management system
- Activity monitoring

---

## Tech Stack

### Frontend
- React
- TypeScript
- TanStack Router
- Tailwind CSS
- Monaco Editor
- Socket.IO Client

### Backend
- Node.js
- Express.js
- Socket.IO

### Integrations
- Codeforces API

---

## System Architecture

```text
                ┌─────────────────────┐
                │      Frontend       │
                │ React + TypeScript  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │     Socket Layer    │
                │      Socket.IO      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │      Backend        │
                │ Node.js + Express   │
                └──────────┬──────────┘
                           │
          ┌────────────────┴──────────────┐
          ▼                               ▼
  Code Execution Engine          External APIs
 (C++ / Python Runtime)          (Codeforces)

```

## Getting Started

Follow the steps below to set up and run NexusForge locally.

### Prerequisites

Make sure the following are installed on your system:

- Node.js (v18 or later recommended)
- npm
- Git
- Python 3.x (for Python code execution)
- g++ Compiler (for C++ code execution)

---

### 1. Clone the Repository

```bash
git clone https://github.com/itz-ab07/NexusForge.git
cd NexusForge
```

---

### 2. Install Frontend Dependencies

```bash
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

---

### 4. Start the Backend Server

Open a new terminal:

```bash
cd backend
node index.js
```

The backend will start on:

```text
http://localhost:5000
```

---

### 5. Start the Frontend

Open another terminal:

```bash
npm run dev
```

The frontend will start on:

```text
http://localhost:8080
```

(or the port shown by Vite)

---

### 6. Access NexusForge

Open your browser and visit:

```text
http://localhost:8080
```

---

## Running a Collaborative Session

1. Create a new room from the dashboard.
2. Copy the generated room invite link.
3. Open another browser window (or share the invite link with a teammate).
4. Join the same room.
5. Start collaborating in real time.

Features available:

- Real-time code synchronization
- Live cursor tracking
- Team chat
- Room invite system
- C++ code execution
- Python code execution

---

## Development Notes

Backend services:

- Socket.IO Collaboration Server
- Code Execution Engine
- Codeforces API Integration

Frontend services:

- React + TypeScript UI
- Monaco Editor
- Real-Time Collaboration Layer
- Dashboard & Activity Tracking

---

## Troubleshooting

### Port 5000 Already in Use

```bash
netstat -ano | findstr :5000
```

Find the running process and stop it before restarting the backend.

### Backend Not Starting

Ensure you are inside the backend directory:

```bash
cd backend
node index.js
```

### Code Execution Not Working

Verify:

- Python is installed and available in PATH
- g++ compiler is installed and available in PATH
