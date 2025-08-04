@echo off
echo 🚀 Deploying BAB AI Backend to AWS Lambda...
echo.

REM Clean previous builds
if exist .aws-sam rmdir /s /q .aws-sam

REM Set environment for production
set NODE_ENV=production

echo 📦 Building SAM application...
sam build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

echo 🚀 Deploying to AWS...
echo Make sure your AWS credentials are configured
echo.

REM Deploy with guided prompts
sam deploy --guided

if errorlevel 1 (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo.
echo ✅ Deployment successful!
echo 💡 Your API is now available on AWS Lambda
echo 📝 Update your frontend API URL to use the new Lambda endpoint
echo.
pause
