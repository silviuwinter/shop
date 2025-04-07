@echo off
REM Install Git
echo Checking for Git installation...
git --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Installing...
    powershell -Command "Invoke-WebRequest -Uri https://github.com/git-for-windows/git/releases/latest/download/Git-2.42.0-64-bit.exe -OutFile %USERPROFILE%\git-installer.exe"
    powershell -Command "Start-Process %USERPROFILE%\git-installer.exe -ArgumentList '/silent' -Verb RunAs -Wait"
    echo Git installed successfully.
) else (
    echo Git is already installed.
)

REM Pull open source repository from URL
git clone https://github.com/silviuwinter/shop.git project
cd project

REM Install Docker for Windows
echo Installing Docker for Windows...
powershell -Command "Invoke-WebRequest -Uri https://desktop.docker.com/win/stable/Docker%20Desktop%20Installer.exe -OutFile %USERPROFILE%\docker-installer.exe"
powershell -Command "Start-Process %USERPROFILE%\docker-installer.exe -Verb RunAs -Wait"

REM Wait for Docker installation to complete
echo Please complete the Docker installation and press any key to continue...
pause

REM Install Docker Compose
echo Installing Docker Compose...
docker-compose --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Docker Compose is not installed. Installing...
    powershell -Command "Invoke-WebRequest -Uri https://github.com/docker/compose/releases/latest/download/docker-compose-Windows-x86_64.exe -OutFile %USERPROFILE%\docker-compose.exe"
    setx PATH "%PATH%;%USERPROFILE%"
    echo Docker Compose installed successfully.
) else (
    echo Docker Compose is already installed.
)

REM Install Node.js
echo Installing Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed. Installing...
    powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi -OutFile %USERPROFILE%\nodejs.msi"
    powershell -Command "Start-Process msiexec.exe -ArgumentList '/i %USERPROFILE%\nodejs.msi /quiet /norestart' -Wait"
    echo Node.js installed successfully.
) else (
    echo Node.js is already installed.
)

echo Setup complete.
pause