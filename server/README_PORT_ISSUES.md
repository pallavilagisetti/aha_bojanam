# Port Conflict Resolution Guide

## Quick Fix

If you get `EADDRINUSE: address already in use :::3005` error:

### Option 1: Use the kill-port script
```bash
npm run kill-port
```

### Option 2: Manual kill (Windows)
```bash
# Find the process using port 3005
netstat -ano | findstr :3005

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Option 3: Kill all Node processes
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

## Change Port

If you want to use a different port:

1. Update `server/.env`:
   ```
   PORT=3005
   ```

2. Update `vite.config.js` proxy target to match

3. Update `src/utils/api.js` baseURL to match

## Prevention

The server now has better error handling that will show you:
- Which port is in use
- How to find and kill the process
- Clear error messages

## Common Ports Used

- Frontend (Vite): Usually 5173
- Backend: 3005 (default)
- Avoid: 3000, 5000, 8080 (commonly used by other services)


