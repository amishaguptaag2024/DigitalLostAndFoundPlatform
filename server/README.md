# Server Configuration

## Storage Options

The server supports two storage backends:

### 1. In-Memory Storage (Default)

- Data is stored in memory
- Data is lost when the server restarts
- No MongoDB required
- Perfect for development and testing

### 2. MongoDB Storage

- Persistent data storage
- Requires MongoDB connection
- Production-ready

## Configuration

### Environment Variables

Create a `.env` file in the `server` directory:

```env
# Storage Configuration
STORAGE_TYPE=memory  # or 'mongodb'

# MongoDB Configuration (only used when STORAGE_TYPE=mongodb)
MONGO_URI=mongodb://localhost:27017/digital_lost_and_found

# Server Configuration
PORT=5000
```

### Default Behavior

- If `STORAGE_TYPE` is not set, defaults to `memory`
- If `STORAGE_TYPE=mongodb` and MongoDB connection fails, server will exit with error
- If `STORAGE_TYPE=memory`, server starts immediately without MongoDB

## Switching Storage Types

To switch from in-memory to MongoDB:

1. Set `STORAGE_TYPE=mongodb` in your `.env` file
2. Ensure MongoDB is running and accessible
3. Set `MONGO_URI` to your MongoDB connection string
4. Restart the server

That's it! The code automatically switches between storage implementations.

## Running the Server

```bash
cd server
npm install
npm run dev
```
