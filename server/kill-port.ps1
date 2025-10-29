# PowerShell script to kill processes on common ports
param(
    [int[]]$Ports = @(3005, 3001, 8080, 5000)
)

Write-Host "Killing processes on ports: $($Ports -join ', ')" -ForegroundColor Yellow

foreach ($port in $Ports) {
    Write-Host "`nChecking port $port..." -ForegroundColor Cyan
    $connections = netstat -ano | Select-String ":$port\s"
    
    if ($connections) {
        $pids = $connections | ForEach-Object {
            $parts = ($_ -split '\s+')
            if ($parts[-1] -match '^\d+$') {
                $parts[-1]
            }
        } | Select-Object -Unique
        
        foreach ($pid in $pids) {
            if ($pid) {
                Write-Host "  Killing process PID: $pid" -ForegroundColor Red
                taskkill /PID $pid /F 2>$null | Out-Null
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "  ✓ Process $pid killed" -ForegroundColor Green
                }
            }
        }
    } else {
        Write-Host "  ✓ Port $port is free" -ForegroundColor Green
    }
}

Write-Host "`nDone! You can now start the server." -ForegroundColor Green


