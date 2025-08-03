# BAB AI - Deployment Strategies

## Primary Deployment: AWS Amplify

- **Frontend**: Hosted on AWS Amplify
- **Backend**: AWS Lambda + API Gateway (recommended) or separate EC2/ECS
- **Database**: AWS RDS PostgreSQL
- **Domain**: amplifyapp.com or custom domain

### AWS Amplify Setup:

1. Connect your GitHub repository
2. Set build settings to use `amplify.yml`
3. Add environment variables in Amplify Console
4. Deploy backend separately (Lambda functions recommended)

## Backup Deployment: Vercel

- **Frontend**: Hosted on Vercel
- **Backend**: Vercel Serverless Functions (in `/api/` directory)
- **Database**: Same PostgreSQL instance
- **Domain**: vercel.app or custom domain

### Vercel Setup:

1. Import GitHub repository
2. Vercel auto-detects `vercel.json` configuration
3. API functions in `/api/` are automatically deployed as serverless functions
4. Uses same database as AWS deployment

## API Strategy

The frontend automatically detects deployment environment:

- **Development**: Uses local backend (localhost:4000) with fallback to `/api`
- **AWS Amplify**: Uses API Gateway URL from `REACT_APP_API_URL`
- **Vercel**: Uses Vercel serverless functions at `/api`

## File Structure

```
bab-ai/
├── frontend/           # React frontend
├── backend/           # Express.js backend (for local/separate deployment)
├── api/              # Vercel serverless functions (backup)
├── amplify.yml       # AWS Amplify build config
├── vercel.json       # Vercel deployment config
└── .env.amplify      # AWS environment variables template
```

## Environment Variables

### AWS Amplify:

```
REACT_APP_API_URL=https://your-api-gateway.amazonaws.com/prod
REACT_APP_DEPLOYMENT_STRATEGY=amplify
```

### Vercel:

- No additional environment variables needed
- Uses relative `/api` paths automatically

## Deployment Commands

- **AWS Amplify**: Automatic on git push
- **Vercel**: Automatic on git push
- **Local Development**: `npm run dev`
