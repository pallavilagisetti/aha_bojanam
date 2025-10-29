# Restaurant Backend API

A Node.js + Express.js backend for restaurant web application with ordering system, reservations, and AI chatbot.

## Features

- User Authentication (JWT + bcrypt)
- Menu Management (CRUD operations)
- Cart & Order Management
- Reservation System
- AI Chatbot Integration (OpenAI)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login

### Menu
- GET `/api/menu` - Get all menu items (public)
- POST `/api/menu` - Add menu item (admin only)
- PUT `/api/menu/:id` - Update menu item (admin only)
- DELETE `/api/menu/:id` - Delete menu item (admin only)

### Orders
- GET `/api/orders` - Get user orders
- POST `/api/orders/checkout` - Create order from cart
- PUT `/api/orders/:id/status` - Update order status (admin only)

### Reservations
- POST `/api/reservations` - Create reservation
- GET `/api/reservations` - Get reservations (admin: all, user: own)

### Chatbot
- POST `/api/chatbot` - Chat with AI assistant


