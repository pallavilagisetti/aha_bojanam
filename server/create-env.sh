#!/bin/bash

# Create .env file with MongoDB and OpenAI credentials
cat > .env << 'EOF'
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_use_random_string_here
OPENAI_API_KEY=your_openai_api_key_here
EOF

echo ".env file created successfully!"


