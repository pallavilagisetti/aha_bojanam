import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Auto-assign admin role for specific email
    const ADMIN_EMAIL = 'pallavilagisetti2003@gmail.com';
    const role = email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? 'admin' : 'customer';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully. Please sign in.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Normalize email - MongoDB schema has lowercase: true, but let's be explicit
    const normalizedEmail = email.toLowerCase().trim();
    
    // Find user - MongoDB will automatically lowercase due to schema, but let's be explicit
    let user = await User.findOne({ email: normalizedEmail });
    
    // Also try with regex case-insensitive search as fallback
    if (!user) {
      user = await User.findOne({ email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') } });
    }
    
    if (!user) {
      console.error(`Login failed: User not found for email: ${normalizedEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`User found: ${user.email}, Role: ${user.role}`);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error(`Login failed: Password mismatch for email: ${normalizedEmail}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Auto-assign admin role for specific email
    const ADMIN_EMAIL = 'pallavilagisetti2003@gmail.com';
    if (normalizedEmail === ADMIN_EMAIL.toLowerCase() && user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`Login successful for: ${user.email}`);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { address, phone } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only allow customers to update address (not admin)
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Admin profiles cannot be updated' });
    }

    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


