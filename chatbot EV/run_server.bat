@echo off
REM Start uvicorn on port 8001
uvicorn server:app --reload --port 8001
pause