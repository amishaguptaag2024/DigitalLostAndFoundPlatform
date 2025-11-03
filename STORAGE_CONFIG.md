# Storage Configuration Guide

## Overview

The server now supports **two storage backends** that can be switched seamlessly via configuration:

1. **In-Memory Storage** (Default) - No database required
2. **MongoDB Storage** - Persistent database storage

## Quick Start

### Using In-Memory Storage (Default)

The server runs with in-memory storage by default. **No configuration needed!**

```bash
cd server
npm run dev
```

✅ **Benefits:**

- No MongoDB setup required
- Perfect for development and testing
- Fast and simple

⚠️ **Limitations:**

- Data is lost when server restarts
- Not suitable for production

### Using MongoDB Storage

1. **Set environment variable:**

```bash
# Option 1: In terminal
export STORAGE_TYPE=mongodb
export MONGO_URI=mongodb://localhost:27017/digital_lost_and_found

# Option 2: Create .env file in server directory
STORAGE_TYPE=mongodb
MONGO_URI=mongodb://localhost:27017/digital_lost_and_found
PORT=5000
```

2. **Ensure MongoDB is running**

3. **Start the server:**

```bash
cd server
npm run dev
```

✅ **Benefits:**

- Persistent data storage
- Production-ready
- Data survives server restarts

## Switching Between Storage Types

### From In-Memory to MongoDB

1. Set `STORAGE_TYPE=mongodb` in your `.env` file
2. Set `MONGO_URI` to your MongoDB connection string
3. Ensure MongoDB is running
4. Restart the server

### From MongoDB to In-Memory

1. Set `STORAGE_TYPE=memory` in your `.env` file (or remove it - memory is default)
2. Restart the server
3. MongoDB connection will not be attempted

## API Behavior

The API endpoints work **exactly the same** regardless of storage type:

- `POST /api/chat/rooms` - Create a chat room
- `GET /api/chat/rooms/item/:itemId` - Get room by item ID
- `POST /api/chat/:roomId/messages` - Create a message
- `GET /api/chat/:roomId/messages` - Get messages for a room

No code changes needed when switching storage types!

## Architecture

The code uses a **storage abstraction layer**:

```
Controllers → Storage Service Interface → Implementation
                                    ├── MemoryStorageService (in-memory)
                                    └── MongoDBStorageService (MongoDB)
```

This allows seamless switching between storage backends without changing any controller code.

## Environment Variables Reference

| Variable       | Default                                            | Description                                                       |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `STORAGE_TYPE` | `memory`                                           | Storage backend: `memory` or `mongodb`                            |
| `MONGO_URI`    | `mongodb://localhost:27017/digital_lost_and_found` | MongoDB connection string (only used when `STORAGE_TYPE=mongodb`) |
| `PORT`         | `5000`                                             | Server port                                                       |

## Troubleshooting

### MongoDB Connection Fails

If you set `STORAGE_TYPE=mongodb` but MongoDB is not available:

- The server will exit with an error
- **Solution:** Either start MongoDB or switch to `STORAGE_TYPE=memory`

### Want to Use MongoDB But Don't Have It Set Up?

Use in-memory storage for now:

```bash
STORAGE_TYPE=memory npm run dev
```

When MongoDB is ready, just change the config:

```bash
STORAGE_TYPE=mongodb npm run dev
```

That's it! No code changes needed.
