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
echo Cloning the project to the Desktop...
cd %USERPROFILE%\Desktop
git clone https://github.com/silviuwinter/shop.git project
cd project

REM Set Execution Policy to RemoteSigned
echo Setting Execution Policy to RemoteSigned...
powershell -Command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"

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
