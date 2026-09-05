// models/User.js
// This is the User MODEL - handles all database operations related to users
// Model = the layer that talks directly to the database

const db = require('../config/db');       // Import database connection
const bcrypt = require('bcryptjs');        // For hashing passwords securely

const User = {

  // ─── CREATE: Register a new user ───────────────────────────────────────────
  // Takes username, email, password → hashes password → saves to DB
  async create(username, email, password) {
    // Hash the password with salt rounds=10 (higher = more secure but slower)
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;
    // Using ? placeholders prevents SQL injection attacks
    const [result] = await db.execute(sql, [username, email, hashedPassword]);
    return result; // Returns { insertId, affectedRows, ... }
  },

  // ─── READ: Find user by email (used during login) ──────────────────────────
  async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await db.execute(sql, [email]);
    return rows[0]; // Returns the user object or undefined
  },

  // ─── READ: Find user by ID (used to get profile) ───────────────────────────
  async findById(id) {
    const sql = `SELECT id, username, email, created_at FROM users WHERE id = ?`;
    // Note: we DON'T select password here for security
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // ─── READ: Check if email already exists (for registration) ────────────────
  async emailExists(email) {
    const sql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await db.execute(sql, [email]);
    return rows.length > 0; // Returns true if email found
  },

  // ─── VERIFY PASSWORD: Compare plain text with hashed password ──────────────
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

};

module.exports = User;
