# Vercel Monorepo API Troubleshooting

## Updated Configuration ✅

Your frontend is now configured to communicate with your Vercel backend using:

```javascript
const API_BASE_URL = '/api' // Production (Vercel)
```

## Expected API Endpoints

Your backend should expose these routes:

- `GET /api/projects` - Returns list of user projects
- `GET /api/items` - Returns list of construction items

## Vercel Monorepo Structure

Your project structure should look like:

```
your-repo/
├── api/                    # Backend API routes
│   ├── projects.js         # Handles /api/projects
│   ├── items.js           # Handles /api/items
│   └── ...
├── src/                   # Frontend React app
│   ├── pages/
│   ├── components/
│   └── ...
├── package.json           # Root package.json
├── vercel.json           # Vercel configuration
└── ...
```

## Testing Your API

1. **Test API endpoints directly:**

   - https://babai-ui.vercel.app/api/projects
   - https://babai-ui.vercel.app/api/items

2. **Check browser console:**
   - Open DevTools → Console
   - Look for API request errors
   - Check Network tab for failed requests

## Common Issues & Solutions

### 1. API Routes Not Found (404)

**Problem:** `/api/projects` returns 404
**Solution:** Check your `api/` folder structure in the root directory

### 2. CORS Issues

**Problem:** CORS errors in console
**Solution:** Add CORS headers to your API routes:

```javascript
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Your API logic here
}
```

### 3. API Route Configuration

Make sure your API routes export a default function:

```javascript
// api/projects.js
export default function handler(req, res) {
  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
  ]
  res.status(200).json(projects)
}
```

### 4. Build Configuration

Check your `vercel.json` for proper configuration:

```json
{
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

## Debugging Steps

1. **Check API directly:** Visit your API URLs in browser
2. **Check console:** Look for network errors
3. **Check Vercel logs:** Go to Vercel dashboard → Functions tab
4. **Local testing:** Test with `vercel dev` locally

## Next Steps

If the API is still not working:

1. Share the exact error messages from browser console
2. Confirm your backend API folder structure
3. Test the API endpoints directly in browser
4. Check Vercel function logs for backend errors
