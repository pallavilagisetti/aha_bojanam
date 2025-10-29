# Complete Frontend-Backend Integration Guide

## Overview
The frontend and backend are now fully connected. All API calls are routed through the backend.

## Setup Instructions

### 1. Start Backend Server
```bash
cd server
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

### 2. Start Frontend Server
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173` (or similar)

### 3. Seed Menu Items (First Time Only)
```bash
cd server
node scripts/seedMenu.js
```
This will populate the database with all menu items.

## Connected Features

### ✅ Menu Items
- **Frontend**: Fetches from `/api/menu`
- **Backend**: `GET /api/menu`
- **Status**: Fully connected

### ✅ Orders
- **Frontend**: Creates orders via `/api/orders/checkout`
- **Backend**: `POST /api/orders/checkout`
- **Status**: Fully connected (requires authentication)

### ✅ Reservations
- **Frontend**: Creates reservations via `/api/reservations`
- **Backend**: `POST /api/reservations`
- **Status**: Fully connected

### ✅ Chatbot
- **Frontend**: Sends messages to `/api/chatbot`
- **Backend**: `POST /api/chatbot`
- **Status**: Fully connected with OpenAI integration

### ✅ Authentication
- **Frontend**: Login/Signup via `/api/auth/login` and `/api/auth/signup`
- **Backend**: Authentication endpoints ready
- **Status**: Ready (Navbar buttons need to be connected)

## API Proxy Configuration

The Vite proxy is configured in `vite.config.js` to forward `/api` requests to `http://localhost:5000`.

## Environment Variables

Backend `.env` file contains:
- MongoDB connection string
- OpenAI API key
- JWT secret

## Next Steps

1. **Seed the database** with menu items using the seed script
2. **Test the connection** by:
   - Browsing menu items (should load from backend)
   - Adding items to cart
   - Creating a reservation
   - Testing the chatbot
3. **Add authentication UI** (login/signup forms) to connect Sign In/Sign Up buttons

## Notes

- Cart is stored in localStorage for now (can be synced with backend later)
- Orders require authentication
- Reservations work without authentication but link to user if logged in
- Chatbot works with or without authentication (better context when authenticated)



