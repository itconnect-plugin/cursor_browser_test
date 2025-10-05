@echo off
cd /d "D:\cursor browser"
echo Starting server on port 5001...
start http://localhost:5001
node server.js
pause

