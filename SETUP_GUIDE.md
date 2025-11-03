# Digital Lost and Found Platform - Setup Guide

This guide will help you set up and run the Digital Lost and Found Platform on your local machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

1. **Node.js** (Version 20.19+ or 22.12+)

   - Check if installed: `node -v`
   - If not installed, download from: https://nodejs.org/
   - Recommended: Install Node.js 22 LTS

2. **npm** (comes with Node.js)

   - Check if installed: `npm -v`

3. **Git** (optional, if cloning from repository)
   - Check if installed: `git --version`

## 🚀 Step-by-Step Setup

### Step 1: Get the Project

If you have the project files already, skip to Step 2.

If you need to clone from a repository:

```bash
git clone <repository-url>
cd DigitalLostAndFoundPlatform
```

### Step 2: Install Server Dependencies

1. Open a terminal/command prompt
2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   This may take a minute or two. You should see a message like:

   ```
   added 163 packages, and audited 164 packages
   ```

### Step 3: Install Client Dependencies

1. Open a **NEW** terminal/command prompt window
2. Navigate to the client directory:

   ```bash
   cd client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

   This may take 1-2 minutes. You should see:

   ```
   added 226 packages, and audited 227 packages
   ```

### Step 4: Verify Node.js Version for Client

The client requires Node.js 20.19+ or 22.12+.

**Check your Node.js version:**

```bash
node -v
```

**If you have an older version:**

**On macOS/Linux (using nvm):**

```bash
# Install nvm if you don't have it (see: https://github.com/nvm-sh/nvm)
nvm install 22
nvm use 22
```

**On Windows:**

- Download and install Node.js 22 LTS from https://nodejs.org/
- Restart your terminal after installation

**Verify the version again:**

```bash
node -v
# Should show v20.19.x or v22.x.x
```

### Step 5: Start the Server

1. In your first terminal, make sure you're in the `server` directory:

   ```bash
   cd server
   ```

2. Start the server:

   ```bash
   npm run dev
   ```

   You should see output like:

   ```
   💾 Using in-memory storage (data will be lost on restart)
   🚀 Server running on port 5000
   ```

   **Keep this terminal window open!** The server needs to keep running.

   ✅ **Server is running on:** `http://localhost:5000`

### Step 6: Start the Client

1. In your second terminal, make sure you're in the `client` directory:

   ```bash
   cd client
   ```

2. Start the client:

   ```bash
   npm run dev
   ```

   You should see output like:

   ```
   VITE v7.1.12  ready in 1027 ms
   ➜  Local:   http://localhost:5173/
   ```

   **Keep this terminal window open too!**

   ✅ **Client is running on:** `http://localhost:5173`

## 🎉 Testing the Application

### Step 7: Open the Application

1. Open your web browser (Chrome, Firefox, Safari, or Edge)

2. Go to: `http://localhost:5173`

3. You should see the Landing Page with:
   - "Anonymous Chat (U5)" section
   - Input field for room ID
   - "Join" and "Create & Join" buttons

### Step 8: Test Chat Functionality

#### Test 1: Create a New Room

1. Click the **"Create & Join"** button
2. Wait a moment (you'll see "Loading..." briefly)
3. You should be redirected to a chat page showing:
   - Room ID at the top
   - Your anonymous name (e.g., "Anonymous1234")
   - An empty message area
   - Input field to type messages

**✅ Success:** If you see the chat page, room creation works!

#### Test 2: Send a Message

1. Type a message in the input field (e.g., "Hello, world!")
2. Click **"Send"** or press **Enter**
3. You should see your message appear in the chat area with:
   - Your anonymous name
   - "(You)" label
   - Your message text
   - Timestamp

**✅ Success:** If your message appears, messaging works!

#### Test 3: Join an Existing Room (Multi-User Test)

**Option A: Using Two Browser Windows**

1. **Window 1:** Note down the Room ID from the chat page
2. **Window 2:** Open a new browser window and go to `http://localhost:5173`
3. In Window 2, paste the Room ID in the input field
4. Click **"Join"**
5. Send a message from Window 2
6. **Window 1:** Wait 2 seconds - you should see the message from Window 2 appear!

**Option B: Using Two Different Browsers**

1. **Browser 1 (e.g., Chrome):** Create a room and note the Room ID
2. **Browser 2 (e.g., Firefox):** Open `http://localhost:5173`
3. Enter the Room ID and click "Join"
4. Send messages from both browsers - you should see each other's messages!

**✅ Success:** If messages appear in both windows, real-time chat works!

## 📝 Important Notes

### Storage Mode

The server is configured to use **in-memory storage** by default. This means:

- ✅ No database setup required
- ✅ Fast and easy for testing
- ⚠️ Data is lost when the server restarts

### Room IDs

- Each room has a unique ID (e.g., `mhijtcme8333dkxzfjf`)
- Share this ID with others to let them join your room
- Room ID is visible at the top of the chat page

### Anonymous Names

- Each user gets a random anonymous name (e.g., `Anonymous5678`)
- Your name is shown at the top of the chat page
- You can see which messages are yours (marked with "(You)")

## 🔧 Troubleshooting

### Problem: "Cannot find module" errors

**Solution:**

```bash
# In server directory
cd server
rm -rf node_modules package-lock.json
npm install

# In client directory (new terminal)
cd client
rm -rf node_modules package-lock.json
npm install
```

### Problem: Server won't start

**Check:**

1. Make sure port 5000 is not already in use
2. Try stopping other applications using port 5000
3. Check terminal for error messages

**Solution:**

```bash
# Check what's using port 5000 (macOS/Linux)
lsof -ti:5000

# Kill the process if needed
kill -9 <PID>
```

### Problem: Client won't start - "Node.js version" error

**Solution:**
The client needs Node.js 20.19+ or 22.12+.

1. Check version: `node -v`
2. If version is too old:
   - **macOS/Linux:** Use `nvm install 22 && nvm use 22`
   - **Windows:** Download Node.js 22 LTS from nodejs.org

### Problem: White screen in browser

**Solution:**

1. Check browser console for errors (F12 → Console tab)
2. Make sure both server and client are running
3. Check that server is on port 5000 and client on port 5173
4. Try hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Problem: "Failed to create room" or "Failed to join room"

**Solution:**

1. Make sure the **server is running** (check terminal for "Server running on port 5000")
2. Check browser console (F12) for detailed error messages
3. Verify server is accessible: Open `http://localhost:5000/api/chat/rooms` in browser
   - You should see: `{"error":"Server error"}` or `[]` - this is normal for a GET request

### Problem: Messages not appearing

**Solution:**

1. Check that both users are in the same room (same Room ID)
2. Messages refresh every 2 seconds automatically
3. Try sending another message
4. Check browser console (F12) for errors

### Problem: Port already in use

**Solution:**
If you see "Port 5000 is already in use" or "Port 5173 is already in use":

**For Server (port 5000):**

- Find and stop the process using port 5000
- Or set a different port: `PORT=5001 npm run dev`

**For Client (port 5173):**

- Vite will automatically try the next available port (5174, 5175, etc.)
- Check the terminal output for the actual port number

## 🎓 Quick Reference Commands

### Start Server

```bash
cd server
npm run dev
```

### Start Client

```bash
cd client
npm run dev
```

### Check Server Status

Open in browser: `http://localhost:5000/api/chat/rooms`

- Should return JSON (even if it's an error object, that means server is running)

### Check Client Status

Open in browser: `http://localhost:5173`

- Should show the landing page

## 📞 Need Help?

If you encounter issues not covered here:

1. **Check the terminal output** - Error messages are usually helpful
2. **Check browser console** - Press F12 → Console tab to see JavaScript errors
3. **Verify both services are running** - Server on port 5000, Client on port 5173
4. **Restart both services** - Stop (Ctrl+C) and start again

## ✨ You're All Set!

Once both server and client are running, you can:

- ✅ Create chat rooms
- ✅ Join existing rooms
- ✅ Send and receive messages in real-time
- ✅ Chat with multiple users in the same room

Happy testing! 🚀
