# Flask Backend - Environment Setup Script for Windows (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Flask Backend Environment Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    $pythonVersion = python --version 2>&1
    Write-Host "[INFO] Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://www.python.org/"
    Read-Host "Press Enter to exit"
    exit 1
}

# 建立虛擬環境 (venv)
Write-Host ""
Write-Host "[INFO] Setting up virtual environment..." -ForegroundColor Cyan

if (Test-Path "venv") {
    Write-Host "[INFO] Virtual environment already exists (venv)" -ForegroundColor Yellow
} else {
    Write-Host "[INFO] Creating virtual environment..." -ForegroundColor Cyan
    python -m venv venv
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to create virtual environment" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[INFO] Virtual environment created" -ForegroundColor Green
}

# 升級 pip
Write-Host "[INFO] Upgrading pip..." -ForegroundColor Cyan
.\venv\Scripts\python -m pip install --upgrade pip

# 安裝 requirements.txt
if (Test-Path "requirements.txt") {
    Write-Host "[INFO] Installing dependencies from requirements.txt..." -ForegroundColor Cyan
    .\venv\Scripts\pip install -r requirements.txt

    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "[WARNING] requirements.txt not found! Skipping dependency install." -ForegroundColor Yellow
}

# 註冊專案套件
if (Test-Path "pyproject.toml") {
    Write-Host "[INFO] Registering project package (editable mode)..." -ForegroundColor Cyan
    .\venv\Scripts\pip install -e .
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to register project package" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[INFO] Project package registered successfully" -ForegroundColor Green
} else {
    Write-Host "[WARNING] pyproject.toml not found! Skipping package registration." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[SUCCESS] Backend environment setup successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To activate the environment (Run this in terminal):" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1"
Write-Host ""
Write-Host "To run the Flask server:" -ForegroundColor Cyan
Write-Host "  python src/app.py"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"