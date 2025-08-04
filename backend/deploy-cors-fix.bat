@echo off
echo 🚀 Deploying Backend with CORS Fix...
echo.

echo 📦 Building Lambda function...
call sam build
if %errorlevel% neq 0 (
    echo ❌ Build failed!
    pause
    exit /b 1
)

echo.
echo 🌐 Deploying to AWS...
call sam deploy
if %errorlevel% neq 0 (
    echo ❌ Deploy failed!
    pause
    exit /b 1
)

echo.
echo ✅ Backend deployed successfully!
echo 📋 Updated CORS settings now include:
echo    - https://bab-ai.com
echo    - https://www.bab-ai.com
echo    - http://bab-ai.com
echo    - http://www.bab-ai.com
echo.
echo 🧪 Test your API now at: https://www.bab-ai.com/api-debug
pause
