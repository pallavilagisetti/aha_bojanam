import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Admin user (pallavilagisetti2003@gmail.com)
    const adminEmail = 'pallavilagisetti2003@gmail.com';
    const adminPassword = 'pallavi'; // Default password
    
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`Admin user already exists: ${adminEmail}`);
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create admin user
      const adminUser = new User({
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

    // Create a test customer user (optional)
    const testCustomerEmail = 'customer@test.com';
    const testCustomerPassword = 'customer123';
    
    const existingCustomer = await User.findOne({ email: testCustomerEmail });
    if (existingCustomer) {
      console.log(`Test customer already exists: ${testCustomerEmail}`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testCustomerPassword, salt);

      const customerUser = new User({
        name: 'Test Customer',
        email: testCustomerEmail,
        password: hashedPassword,
        role: 'customer'
      });

      await customerUser.save();
      console.log(`✓ Test customer created successfully!`);
      console.log(`  Email: ${testCustomerEmail}`);
      console.log(`  Password: ${testCustomerPassword}`);
    }

    console.log('\n✅ User seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

