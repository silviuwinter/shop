@echo off

REM Install Chocolatey
echo Checking for Chocolatey installation...
choco --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Chocolatey is not installed. Installing...
    powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))"
    echo Chocolatey installed successfully.
) else (
    echo Chocolatey is already installed.
)

REM Install Git
echo Installing Git...
choco install git -y

REM Pull open source repository from URL
git clone https://github.com/silviuwinter/shop.git project
cd project

REM Install Docker for Windows
echo Installing Docker for Windows...
choco install docker-desktop -y

REM Wait for Docker installation to complete
echo Please complete the Docker installation and press any key to continue...
pause

REM Install Docker Compose
echo Installing Docker Compose...
choco install docker-compose -y

REM Install Node.js
echo Installing Node.js...
choco install nodejs-lts -y

echo Setup complete.
pause