# Quick Start Guide

## 🚀 Getting Started

### Step 1: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
npm install
```

### Step 2: Seed Database

Run this ONCE to populate menu items:
```bash
cd server
npm run seed
```

### Step 3: Start Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:5173` (or similar)

### Step 4: Test the Application

1. Open `http://localhost:5173` in your browser
2. Menu items should load from the backend
3. Add items to cart
4. Try the chatbot (bottom-right corner)
5. Make a reservation

## ✅ What's Connected

- ✅ Menu items fetch from backend
- ✅ Orders create in backend (requires sign in)
- ✅ Reservations create in backend
- ✅ Chatbot uses OpenAI API
- ✅ Vite proxy configured for API calls

## 📝 Notes

- Port 5000 must be available for backend
- Make sure MongoDB Atlas connection is working
- Chatbot needs OpenAI API key in `.env` file
- Orders require user authentication (Sign In/Sign Up buttons need UI)



