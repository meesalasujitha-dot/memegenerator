# Meme Generator - Backend API

This directory contains the Express/Node.js backend for the Meme Generator application.
It provides secure user authentication and database operations via MongoDB to save, fetch, and delete generated memes.

## 🚀 Setup & Installation (Local Development)

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Configuration**
   In the `backend` folder, rename `.env.example` to `.env`.
   Configure the following variables:
   - `PORT`: (Default 5000)
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secure random string for signing user tokens.

3. **Database Setup**
   - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Under "Database Access", create a database user with password.
   - Under "Network Access", allow your IP (or `0.0.0.0/0` for universal connectivity).
   - Get the connection string and paste it into `MONGO_URI`.

4. **Run the Server**
   ```bash
   node server.js
   ```

## ☁️ Deployment instructions (Render / Railway)

1. **Connect your Git Repository**
   Create a new Web Service inside Render (or Railway) and link it to your GitHub repository containing this code.

2. **Configure Build & Run Settings**
   - **Root Directory**: `backend` (if deploying backend separately inside a mono-repo)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

3. **Set Environment Variables**
   Critically, add these variables in your Render/Railway dashboard natively:
   - `MONGO_URI`: (Your production MongoDB Atlas string)
   - `JWT_SECRET`: (Your production secure string)
   - `FRONTEND_URL`: `https://your-vercel-domain.vercel.app` (This is VERY IMPORTANT to fix strict CORS parameters allowing your frontend to contact this custom API securely).

Your server utilizes `process.env.PORT` dynamically which satisfies Render/Railway scaling requirements instantly.
