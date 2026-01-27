const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const { auth, authorize } = require('../middleware/auth');

// @route   GET /api/pets
// @desc    Get all pets with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      type, 
      size, 
      age, 
      gender, 
      status = 'available',
      search,
      page = 1, 
      limit = 12,
      sort = '-dateAdded'
    } = req.query;

    // Build query
    const query = {};
    
    if (type) query.type = type.toLowerCase();
    if (size) query.size = size.toLowerCase();
    if (gender) query.gender = gender.toLowerCase();
    if (status) query.status = status.toLowerCase();
    
    // Age range filter
    if (age) {
      if (age === 'puppy' || age === 'kitten') {
        query.age = { $lte: 1 };
      } else if (age === 'young') {
        query.age = { $gt: 1, $lte: 3 };
      } else if (age === 'adult') {
        query.age = { $gt: 3, $lte: 8 };
      } else if (age === 'senior') {
        query.age = { $gt: 8 };
      }
    }

    // Text search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const pets = await Pet.find(query)
      .populate('shelter', 'name email phone')
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Pet.countDocuments(query);

    res.json({
      success: true,
      count: pets.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: pets
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching pets', 
      error: error.message 
    });
  }
});

// @route   GET /api/pets/:id
// @desc    Get single pet by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('shelter', 'name email phone address');

    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pet not found' 
      });
    }

    res.json({ success: true, data: pet });
  } catch (error) {
    console.error('Error fetching pet:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ 
        success: false, 
        message: 'Pet not found' 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching pet', 
      error: error.message 
    });
  }
});

// @route   POST /api/pets
// @desc    Create a new pet
// @access  Private (Shelter/Admin only)
router.post('/', auth, authorize('shelter', 'admin'), async (req, res) => {
  try {
    const petData = {
      ...req.body,
      shelter: req.user.id
    };

    const pet = await Pet.create(petData);
    res.status(201).json({ 
      success: true, 
      message: 'Pet added successfully', 
      data: pet 
    });
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error creating pet', 
      error: error.message 
    });
  }
});

// @route   PUT /api/pets/:id
// @desc    Update pet
// @access  Private (Shelter/Admin only)
router.put('/:id', auth, authorize('shelter', 'admin'), async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pet not found' 
      });
    }

    // Check ownership (unless admin)
    if (pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this pet' 
      });
    }

    pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ 
      success: true, 
      message: 'Pet updated successfully', 
      data: pet 
    });
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error updating pet', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/pets/:id
// @desc    Delete pet
// @access  Private (Shelter/Admin only)
router.delete('/:id', auth, authorize('shelter', 'admin'), async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pet not found' 
      });
    }

    // Check ownership (unless admin)
    if (pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this pet' 
      });
    }

    await pet.deleteOne();

    res.json({ 
      success: true, 
      message: 'Pet deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting pet', 
      error: error.message 
    });
  }
});

module.exports = router;
