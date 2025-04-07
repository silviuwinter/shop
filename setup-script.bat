@echo off

echo This will first install chocolatey, then other tools
echo .
echo Browse https://chocolatey.org/packages for packages
echo .
echo Ensure that your cmd.exe runs as Administrator
echo .
echo If at university, disable any proxy in the Internet Explorer Network settings.
echo .
pause
echo .

powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
choco feature enable -n=allowGlobalConfirmation
pause

echo Now chocolatey should be ready and we can go ahead
echo .
pause

rem enable clicking on choco:// links in the browser
rem https://community.chocolatey.org/packages/choco-protocol-support
rem choco install choco-protocol-support

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