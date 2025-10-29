import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Found' : 'NOT FOUND'}`);
    
    if (!process.env.MONGODB_URI) {
      console.error('❌ ERROR: MONGODB_URI not found in environment variables');
      console.error('Please check your .env file in the server directory');
      process.exit(1);
    }

    console.log('Attempting to connect...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Test database operations
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`\n📊 Collections in database: ${collections.length}`);
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR: Failed to connect to MongoDB');
    console.error(`   Error: ${error.message}`);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Tip: Check your MongoDB username and password in the connection string');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 Tip: Check your MongoDB host/URL in the connection string');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Tip: Check your network connection and MongoDB Atlas IP whitelist');
    } else if (error.message.includes('IP')) {
      console.error('\n💡 Tip: Add your IP address to MongoDB Atlas Network Access whitelist');
    }
    
    process.exit(1);
  }
};

testConnection();

