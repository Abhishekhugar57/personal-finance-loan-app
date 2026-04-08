# 🚀 Deployment Guide for Personal Finance App

## 📋 Overview
This guide will help you deploy your Personal Finance and Loan Tracker for free using:
- **Backend**: Render (Node.js + Express)
- **Frontend**: Vercel (React + Vite)
- **Database**: MongoDB Atlas (Free tier)

## 🗄️ Step 1: MongoDB Atlas Setup

1. **Create Account**: Visit https://www.mongodb.com/atlas
2. **Create Free Cluster**:
   - Click "Build a Database"
   - Choose "M0 Sandbox" (free tier)
   - Select cloud provider and region closest to you
   - Cluster name: `finance-tracker`

3. **Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Username: `finance-app`
   - Password: Generate a strong password
   - Save credentials securely

4. **Network Access**:
   - Go to "Network Access" → "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String**:
   - Go to "Database" → "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://finance-app:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ExpenseTracker?retryWrites=true&w=majority`

## 🔧 Step 2: Update Environment Variables

### Backend Environment Variables
Create these in your Render dashboard:

```bash
MONGO_URI=mongodb+srv://finance-app:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ExpenseTracker?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-jwt-secret-key-here
PORT=5000
FRONTEND_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### Frontend Environment Variables
Create these in your Vercel dashboard:

```bash
VITE_API_URL=https://your-backend-app.onrender.com
```

## 🌐 Step 3: Backend Deployment (Render)

1. **Create Render Account**: https://render.com
2. **Connect GitHub**:
   - Click "New" → "Web Service"
   - Connect your GitHub account
   - Select your repository

3. **Configure Service**:
   - **Name**: `finance-tracker-backend`
   - **Region**: Choose closest to your database
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && node index.js`

4. **Environment Variables**:
   - Add all backend environment variables from Step 2

5. **Deploy**: Click "Create Web Service"

## 🎨 Step 4: Frontend Deployment (Vercel)

1. **Create Vercel Account**: https://vercel.com
2. **Import Project**:
   - Click "Add New" → "Project"
   - Connect your GitHub account
   - Select your repository

3. **Configure Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend/finance-tracker-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Environment Variables**:
   - Add `VITE_API_URL` with your Render backend URL

5. **Deploy**: Click "Deploy"

## 🔗 Step 5: Update CORS Configuration

Your backend should already be configured to accept requests from your frontend. The `FRONTEND_URL` environment variable will handle CORS automatically.

## ✅ Step 6: Testing Your Deployment

1. **Backend Health Check**: Visit `https://your-backend-app.onrender.com/`
   - Should return: "API is running..."

2. **Frontend**: Visit `https://your-app-name.vercel.app`
   - Should load the login page
   - Test signup/login functionality

3. **Database Connection**: Check Render logs for MongoDB connection status

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `FRONTEND_URL` matches your Vercel domain exactly
   - Check backend logs for CORS errors

2. **Database Connection**:
   - Verify MongoDB Atlas IP access (0.0.0.0/0)
   - Check connection string format
   - Ensure database user has correct permissions

3. **Build Failures**:
   - Check `package.json` scripts
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

4. **Environment Variables**:
   - Ensure no typos in variable names
   - Check that sensitive values are correct
   - Verify frontend variables start with `VITE_`

## 📊 Free Tier Limitations

### Render (Backend):
- 750 hours/month (always on)
- 512MB RAM
- Shared CPU
- Auto-sleeps after 15min inactivity

### Vercel (Frontend):
- Unlimited static hosting
- 100GB bandwidth/month
- Edge functions with limits

### MongoDB Atlas:
- 512MB storage
- Shared cluster
- Perfect for development/small apps

## 🔄 Continuous Deployment

Both platforms support automatic deployment:
- Push to `main` branch → Auto-deploy
- Preview deployments for pull requests
- Rollback capabilities

## 🚀 Next Steps

1. **Monitor**: Set up monitoring for uptime
2. **Backup**: Regular database backups
3. **Scale**: Upgrade plans as traffic grows
4. **Domain**: Add custom domain names
5. **Security**: Add HTTPS, rate limiting

## 📞 Support Links

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.mongodb.com/atlas

---

**🎉 Congratulations! Your app is now live and accessible to users worldwide!**
