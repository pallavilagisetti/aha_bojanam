@echo off
echo Killing processes on ports 3005, 3001, 8080, 5000...

for %%p in (3005 3001 8080 5000) do (
    echo Checking port %%p...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%p') do (
        if not "%%a"=="" (
            echo   Killing process PID: %%a
            taskkill /PID %%a /F >nul 2>&1
        )
    )
)

echo Done! You can now start the server.
pause



