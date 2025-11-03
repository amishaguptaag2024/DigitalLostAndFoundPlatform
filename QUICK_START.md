# Quick Start Guide

## Prerequisites

- Node.js 20.19+ or 22.12+ (download from https://nodejs.org/)
- npm (comes with Node.js)

## Quick Setup (5 minutes)

### 1. Install Dependencies

**Terminal 1 - Server:**

```bash
cd server
npm install
```

**Terminal 2 - Client:**

```bash
cd client
npm install
```

### 2. Start the Application

**Terminal 1 - Start Server:**

```bash
cd server
npm run dev
```

✅ Server runs on `http://localhost:5000`

**Terminal 2 - Start Client:**

```bash
cd client
npm run dev
```

✅ Client runs on `http://localhost:5173`

### 3. Open in Browser

Go to: **http://localhost:5173**

## Test It!

1. Click **"Create & Join"** → Creates a new chat room
2. Type a message and click **"Send"**
3. Open a new browser tab → Enter the Room ID → Click **"Join"**
4. Send messages from both tabs → See them appear in both!

## Troubleshooting

**Client won't start?** Check Node.js version: `node -v` (needs 20.19+ or 22.12+)

**White screen?** Make sure both server AND client are running in separate terminals

**Messages not appearing?** Wait 2 seconds (auto-refresh) or check that both users are in the same room

---

For detailed instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
