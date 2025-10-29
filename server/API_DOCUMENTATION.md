# Restaurant Backend API Documentation

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restaurant
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system.

4. **Run the Server**
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer" // optional, defaults to "customer"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

---

### Menu (`/api/menu`)

#### GET `/api/menu`
Get all menu items (public).

**Query Parameters:**
- `category` (optional): Filter by category

**Example:** `GET /api/menu?category=Special Burgers`

#### GET `/api/menu/:id`
Get a specific menu item (public).

#### POST `/api/menu`
Create a new menu item (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Classic Cheeseburger",
  "category": "Special Burgers",
  "price": 12.99,
  "image": "https://example.com/image.jpg",
  "description": "Juicy beef patty with cheese"
}
```

#### PUT `/api/menu/:id`
Update a menu item (admin only).

#### DELETE `/api/menu/:id`
Delete a menu item (admin only).

---

### Orders (`/api/orders`)

**All routes require authentication.**

#### GET `/api/orders`
Get user orders (customer sees own orders, admin sees all).

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/orders/:id`
Get a specific order.

#### POST `/api/orders/checkout`
Create order from cart.

**Request Body:**
```json
{
  "items": [
    {
      "menuItemId": "menu_item_id",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main St, City",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "order_id",
    "userId": "user_id",
    "items": [...],
    "subtotal": 25.98,
    "tax": 2.08,
    "total": 28.06,
    "status": "pending"
  }
}
```

#### PUT `/api/orders/:id/status`
Update order status (admin only).

**Request Body:**
```json
{
  "status": "confirmed" // pending, confirmed, preparing, out for delivery, delivered
}
```

---

### Reservations (`/api/reservations`)

#### POST `/api/reservations`
Create a reservation (public - no auth required, but links to user if token provided).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "date": "2024-12-25",
  "time": "19:00",
  "guests": 4,
  "specialRequests": "Window seat preferred"
}
```

#### GET `/api/reservations`
Get reservations (requires auth - customer sees own, admin sees all).

#### GET `/api/reservations/:id`
Get a specific reservation.

#### PUT `/api/reservations/:id/status`
Update reservation status (admin only).

**Request Body:**
```json
{
  "status": "confirmed" // pending, confirmed, cancelled
}
```

---

### Chatbot (`/api/chatbot`)

#### POST `/api/chatbot`
Chat with AI assistant.

**Request Body:**
```json
{
  "message": "What are your special burgers?"
}
```

**Headers (optional):**
```
Authorization: Bearer <token>
```
If authenticated, chatbot can provide order tracking and personalized recommendations.

**Response:**
```json
{
  "response": "We offer several special burgers including Classic Cheeseburger, Bacon Deluxe Burger...",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are valid for 7 days.

## Admin Endpoints

The following endpoints require admin role:
- All menu CRUD operations (POST, PUT, DELETE `/api/menu`)
- Update order status (`PUT /api/orders/:id/status`)
- Update reservation status (`PUT /api/reservations/:id/status`)

To create an admin user, signup with `"role": "admin"` or update the user manually in MongoDB.

## Error Responses

All errors follow this format:

```json
{
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error


