const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d'
  });
};

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }

    // Validate role
    const validRoles = ['user', 'shelter'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role specified' 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'user',
      phone,
      address
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error registering user', 
      error: error.message 
    });
  }
});

// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email and password' 
      });
    }

    // Find user with password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error logging in', 
      error: error.message 
    });
  }
});

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('savedPets')
      .populate({
        path: 'applications',
        populate: { path: 'pet' }
      });

    res.json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user profile', 
      error: error.message 
    });
  }
});

// @route   PUT /api/users/me
// @desc    Update current user profile
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const allowedUpdates = ['name', 'phone', 'address', 'preferences'];
    const updates = {};

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Profile updated successfully', 
      data: user 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error updating profile', 
      error: error.message 
    });
  }
});

// @route   POST /api/users/me/saved-pets/:petId
// @desc    Save/unsave a pet
// @access  Private
router.post('/me/saved-pets/:petId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const petId = req.params.petId;

    const index = user.savedPets.indexOf(petId);

    if (index > -1) {
      // Remove from saved pets
      user.savedPets.splice(index, 1);
      await user.save();
      res.json({ 
        success: true, 
        message: 'Pet removed from favorites',
        saved: false
      });
    } else {
      // Add to saved pets
      user.savedPets.push(petId);
      await user.save();
      res.json({ 
        success: true, 
        message: 'Pet added to favorites',
        saved: true
      });
    }
  } catch (error) {
    console.error('Error saving pet:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error saving pet', 
      error: error.message 
    });
  }
});

// @route   GET /api/users/me/saved-pets
// @desc    Get user's saved pets
// @access  Private
router.get('/me/saved-pets', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedPets');
    res.json({ 
      success: true, 
      data: user.savedPets 
    });
  } catch (error) {
    console.error('Error fetching saved pets:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching saved pets', 
      error: error.message 
    });
  }
});

module.exports = router;