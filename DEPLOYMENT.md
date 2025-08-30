# TCE Compass Deployment Guide

This guide will help you deploy your TCE Compass project so students can access it via a public link.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Netlify Account** - For frontend deployment (free)
3. **Render Account** - For backend deployment (free)
4. **Google AI API Key** - For Gemini AI functionality

## Step 1: Deploy Backend to Render

### 1.1 Push your code to GitHub
```bash
cd TCE-compass
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tce-compass.git
git push -u origin main
```

### 1.2 Deploy to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `tce-compass-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Set Environment Variables
In Render dashboard, go to your service → Environment:
- `GEMINI_API_KEY`: Your Google AI API key
- `NODE_ENV`: `production`

### 1.4 Get Backend URL
After deployment, you'll get a URL like: `https://tce-compass-backend.onrender.com`

## Step 2: Deploy Frontend to Netlify

### 2.1 Update Frontend Configuration
Create a `.env` file in the frontend folder:
```bash
cd frontend
echo "VITE_API_URL=https://your-backend-name.onrender.com" > .env
```

### 2.2 Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`

### 2.3 Set Environment Variables
In Netlify dashboard, go to Site settings → Environment variables:
- `VITE_API_URL`: Your Render backend URL

## Step 3: Update Frontend Code

You need to update your frontend to use the environment variable for the API URL. In your components that make API calls, replace hardcoded URLs with:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

## Step 4: Test Deployment

1. **Backend**: Visit `https://your-backend-name.onrender.com/health`
2. **Frontend**: Visit your Netlify URL
3. Test the chatbot functionality

## Alternative: Deploy Both on Render

If you prefer to keep everything on one platform:

1. Create a new Web Service for the backend
2. Create a new Static Site for the frontend
3. Build the frontend locally: `npm run build`
4. Upload the `dist` folder contents to Render Static Site

## Important Notes

- **Free Tier Limits**: Both platforms have usage limits on free tiers
- **API Key Security**: Never commit your API key to GitHub
- **CORS**: Your backend already has CORS enabled for all origins
- **File Uploads**: The CSV dataset is included in your backend deployment

## Custom Domain (Optional)

You can add a custom domain like `tce-compass.yourcollege.edu` through:
- Netlify: Site settings → Domain management
- Render: Custom domains section

## Support

If you encounter issues:
1. Check Render logs for backend errors
2. Check Netlify build logs for frontend issues
3. Verify environment variables are set correctly
4. Ensure your GitHub repository is public or connected properly

Your students will be able to access the application via the Netlify URL once deployment is complete!
