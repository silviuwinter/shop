@echo off

echo This will use winget to install required tools
echo .
echo Ensure that your cmd.exe runs as Administrator
echo .
pause
echo .

REM Install Git
echo Installing Git...
winget install --id Git.Git -e --source winget

REM Refresh system PATH to recognize Git
echo Refreshing system PATH...
setx PATH "%PATH%;C:\Program Files\Git\cmd"
set PATH=%PATH%;C:\Program Files\Git\cmd

REM Pull open source repository from URL
git clone https://github.com/silviuwinter/shop.git project
cd project

REM Install Docker for Windows
echo Installing Docker for Windows...
winget install --id Docker.DockerDesktop -e --source winget

REM Wait for Docker installation to complete
echo Please complete the Docker installation and press any key to continue...
pause

REM Install Docker Compose
echo Installing Docker Compose...
REM Docker Compose is included with Docker Desktop, no separate installation needed.

REM Install Node.js
echo Installing Node.js...
winget install --id OpenJS.NodeJS.LTS -e --source winget

REM Install Visual Studio Code
echo Installing Visual Studio Code...
winget install --id Microsoft.VisualStudioCode -e --source winget

echo Setup complete.
echo Opening project in Visual Studio Code...
code .

pause