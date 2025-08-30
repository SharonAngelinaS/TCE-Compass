#!/bin/bash

echo "🚀 TCE Compass Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "📁 Git repository already exists"
fi

echo ""
echo "🔧 Next steps:"
echo "1. Create a GitHub repository and push your code:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/tce-compass.git"
echo "   git push -u origin main"
echo ""
echo "2. Deploy backend to Render:"
echo "   - Go to render.com"
echo "   - Create new Web Service"
echo "   - Connect your GitHub repo"
echo "   - Set environment variables (GEMINI_API_KEY)"
echo ""
echo "3. Deploy frontend to Netlify:"
echo "   - Go to netlify.com"
echo "   - Create new site from Git"
echo "   - Connect your GitHub repo"
echo "   - Set base directory to 'frontend'"
echo "   - Set VITE_API_URL to your Render backend URL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo "🎯 Your students will access the app via the Netlify URL!"
