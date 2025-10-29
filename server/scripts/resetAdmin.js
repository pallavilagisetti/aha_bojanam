import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const createOrResetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'pallavilagisetti2003@gmail.com';
    const adminPassword = 'pallavi';
    
    // Check if admin user exists
    let adminUser = await User.findOne({ email: adminEmail });
    
    if (adminUser) {
      console.log(`Admin user found: ${adminEmail}`);
      
      // Reset password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      adminUser.password = hashedPassword;
      adminUser.role = 'admin';
      await adminUser.save();
      
      console.log(`✓ Admin password reset successfully!`);
      console.log(`  Email: ${adminEmail}`);
      console.log(`  Password: ${adminPassword}`);
    } else {
      // Create admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      adminUser = new User({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log(`✓ Admin user created successfully!`);
      console.log(`  Email: ${adminEmail}`);
      console.log(`  Password: ${adminPassword}`);
    }

    // Verify the user can be found
    const verifyUser = await User.findOne({ email: adminEmail });
    if (verifyUser) {
      console.log(`\n✓ Verification: User found in database`);
      console.log(`  Name: ${verifyUser.name}`);
      console.log(`  Email: ${verifyUser.email}`);
      console.log(`  Role: ${verifyUser.role}`);
      
      // Test password hash
      const testMatch = await bcrypt.compare(adminPassword, verifyUser.password);
      console.log(`  Password match test: ${testMatch ? '✓ PASS' : '✗ FAIL'}`);
    }

    console.log('\n✅ Admin user setup completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createOrResetAdmin();

