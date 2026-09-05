// controllers/authController.js
// AUTH CONTROLLER - handles the logic for register and login
// Controller = receives request → processes logic → sends response

const jwt = require('jsonwebtoken');
const User = require('../models/User');   // Import User model
require('dotenv').config();

// ─── REGISTER: POST /api/auth/register ──────────────────────────────────────
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if email is already taken
    const emailTaken = await User.emailExists(email);
    if (emailTaken) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered. Please login or use a different email.'
      });
    }

    // Create the user (model handles password hashing)
    const result = await User.create(username, email, password);

    // Respond with success (don't return the password)
    res.status(201).json({
      success: true,
      message: 'Registration successful! You can now login.',
      data: {
        userId: result.insertId,
        username,
        email
      }
    });

  } catch (error) {
    next(error); // Pass error to the error middleware
  }
};

// ─── LOGIN: POST /api/auth/login ─────────────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
        // Generic message for security - don't reveal which field is wrong
      });
    }

    // Step 2: Compare the provided password with the stored hashed password
    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Step 3: Generate a JWT token
    // The PAYLOAD contains user info that gets encoded into the token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    const token = jwt.sign(
      payload,                        // Data to encode
      process.env.JWT_SECRET,         // Secret key (keep this PRIVATE)
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } // Token expiry
    );

    // Step 4: Respond with the token
    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        token,             // The JWT token (client must store this)
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

// ─── GET PROFILE: GET /api/auth/profile (protected) ──────────────────────────
const getProfile = async (req, res, next) => {
  try {
    // req.user is set by authMiddleware after verifying the token
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };
