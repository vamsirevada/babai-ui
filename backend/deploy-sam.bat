@echo off
echo 🚀 Deploying BAB AI Backend with SAM...
echo.

REM Set PATH to include SAM and AWS CLI
set PATH=%PATH%;"C:\Program Files\Amazon\AWSSAMCLI\bin";"C:\Program Files\Amazon\AWSCLIV2"

echo 📦 Building SAM application...
"C:\Program Files\Amazon\AWSSAMCLI\bin\sam.cmd" build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.
echo 🚀 Starting guided deployment...
echo You will be prompted for:
echo - Stack name: bab-ai-backend
echo - AWS Region: us-east-1 (or your preferred region)
echo - DbHost: db.bab-ai.com
echo - DbUser: babai_admin
echo - DbPassword: ecq5UmGxgjqDFYZPDZFW
echo - DbDatabase: test
echo - Confirm changes: Y
echo - Allow SAM to create IAM roles: Y
echo - Save parameters: Y
echo.
pause

"C:\Program Files\Amazon\AWSSAMCLI\bin\sam.cmd" deploy --guided

if errorlevel 1 (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo ✅ Deployment successful!
echo.
echo 📋 Next steps:
echo 1. Copy the API Gateway URL from the output above
echo 2. Go to AWS Amplify Console
echo 3. Update VITE_API_URL environment variable with the API Gateway URL
echo 4. Redeploy your Amplify frontend
echo.
pause
