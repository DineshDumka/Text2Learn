# Text2Learn Local Development Startup Script
# This script starts both frontend and backend servers

Write-Host "🚀 Starting Text2Learn Development Servers" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Check if directories exist
if (-not (Test-Path "server")) {
    Write-Host "❌ server/ directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

if (-not (Test-Path "client")) {
    Write-Host "❌ client/ directory not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

# Install dependencies if needed
Write-Host ""
Write-Host "📦 Checking Dependencies..." -ForegroundColor Cyan

if (-not (Test-Path "server\node_modules")) {
    Write-Host "Installing server dependencies..." -ForegroundColor Yellow
    Push-Location server
    npm install
    Pop-Location
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Server dependencies already installed" -ForegroundColor Green
}

if (-not (Test-Path "client\node_modules")) {
    Write-Host "Installing client dependencies..." -ForegroundColor Yellow
    Push-Location client
    npm install
    Pop-Location
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✅ Client dependencies already installed" -ForegroundColor Green
}

# Check environment files
Write-Host ""
Write-Host "🔧 Checking Environment Configuration..." -ForegroundColor Cyan

if (-not (Test-Path "server\.env")) {
    Write-Host "⚠️  server/.env not found!" -ForegroundColor Yellow
    if (Test-Path "server\.env.example") {
        Write-Host "Creating from .env.example..." -ForegroundColor Yellow
        Copy-Item "server\.env.example" "server\.env"
        Write-Host "❗ Please edit server/.env with your API keys!" -ForegroundColor Red
        exit 1
    } else {
        Write-Host "❌ No .env.example found. Cannot proceed." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ server/.env configured" -ForegroundColor Green
}

if (-not (Test-Path "client\.env")) {
    Write-Host "⚠️  client/.env not found!" -ForegroundColor Yellow
    if (Test-Path "client\.env.example") {
        Write-Host "Creating from .env.example..." -ForegroundColor Yellow
        Copy-Item "client\.env.example" "client\.env"
        Write-Host "✅ client/.env created" -ForegroundColor Green
    }
} else {
    Write-Host "✅ client/.env configured" -ForegroundColor Green
}

# Start servers
Write-Host ""
Write-Host "🚀 Starting Servers..." -ForegroundColor Cyan
Write-Host ""

# Start backend in new window
Write-Host "Starting Backend Server (http://localhost:5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; Write-Host '🔧 Backend Server' -ForegroundColor Cyan; Write-Host 'Running on http://localhost:5000' -ForegroundColor Green; Write-Host ''; npm run dev"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting Frontend Server (http://localhost:5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; Write-Host '🎨 Frontend Server' -ForegroundColor Cyan; Write-Host 'Running on http://localhost:5173' -ForegroundColor Green; Write-Host ''; npm run dev"

# Wait for frontend to start
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "✅ Servers Started!" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📱 Frontend:  http://localhost:5173" -ForegroundColor Green
Write-Host "🔧 Backend:   http://localhost:5000" -ForegroundColor Green
Write-Host "📊 Health:    http://localhost:5000/health" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "  - Two PowerShell windows have opened for backend and frontend" -ForegroundColor White
Write-Host "  - Check those windows for logs and errors" -ForegroundColor White
Write-Host "  - Press Ctrl+C in those windows to stop servers" -ForegroundColor White
Write-Host "  - Your default browser should open automatically" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Happy Learning!" -ForegroundColor Green
Write-Host ""

# Try to open browser
Start-Sleep -Seconds 2
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Press any key to close this window..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
