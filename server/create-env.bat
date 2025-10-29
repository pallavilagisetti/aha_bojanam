@echo off
REM Create .env file with MongoDB and OpenAI credentials

(
echo PORT=5000
echo MONGODB_URI=your_mongodb_connection_string_here
echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_use_random_string_here
echo OPENAI_API_KEY=your_openai_api_key_here
) > .env

echo .env file created successfully!


