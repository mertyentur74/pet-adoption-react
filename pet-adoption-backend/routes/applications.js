const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Pet = require('../models/Pet');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

// @route   POST /api/applications
// @desc    Submit adoption application
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { petId, ...applicationData } = req.body;

    // Check if pet exists and is available
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pet not found' 
      });
    }

    if (pet.status !== 'available') {
      return res.status(400).json({ 
        success: false, 
        message: 'This pet is no longer available for adoption' 
      });
    }

    // Check if user already has a pending application for this pet
    const existingApplication = await Application.findOne({
      pet: petId,
      user: req.user.id,
      status: 'pending'
    });

    if (existingApplication) {
      return res.status(400).json({ 
        success: false, 
        message: 'You already have a pending application for this pet' 
      });
    }

    // Create application
    const application = await Application.create({
      pet: petId,
      user: req.user.id,
      ...applicationData
    });

    // Update pet status to pending
    pet.status = 'pending';
    await pet.save();

    // Add application to user's applications
    await User.findByIdAndUpdate(req.user.id, {
      $push: { applications: application._id }
    });

    const populatedApplication = await Application.findById(application._id)
      .populate('pet')
      .populate('user', 'name email');

    res.status(201).json({ 
      success: true, 
      message: 'Application submitted successfully', 
      data: populatedApplication 
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error submitting application', 
      error: error.message 
    });
  }
});

// @route   GET /api/applications
// @desc    Get applications (user's own or shelter's received)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'user') {
      // Users see their own applications
      query.user = req.user.id;
    } else if (req.user.role === 'shelter') {
      // Shelters see applications for their pets
      const shelterPets = await Pet.find({ shelter: req.user.id }).select('_id');
      const petIds = shelterPets.map(pet => pet._id);
      query.pet = { $in: petIds };
    } else if (req.user.role === 'admin') {
      // Admins see all applications
      query = {};
    }

    const applications = await Application.find(query)
      .populate('pet')
      .populate('user', 'name email phone')
      .populate('reviewedBy', 'name')
      .sort('-submittedAt');

    res.json({ 
      success: true, 
      count: applications.length,
      data: applications 
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching applications', 
      error: error.message 
    });
  }
});

// @route   GET /api/applications/:id
// @desc    Get single application
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('pet')
      .populate('user', 'name email phone')
      .populate('reviewedBy', 'name');

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Check authorization
    const pet = await Pet.findById(application.pet._id);
    if (
      application.user._id.toString() !== req.user.id &&
      pet.shelter.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to view this application' 
      });
    }

    res.json({ 
      success: true, 
      data: application 
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching application', 
      error: error.message 
    });
  }
});

// @route   PUT /api/applications/:id
// @desc    Update application status (approve/reject)
// @access  Private (Shelter/Admin only)
router.put('/:id', auth, authorize('shelter', 'admin'), async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;

    const application = await Application.findById(req.params.id).populate('pet');

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Check authorization (shelter must own the pet)
    const pet = await Pet.findById(application.pet._id);
    if (pet.shelter.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to update this application' 
      });
    }

    // Update application
    application.status = status;
    application.reviewNotes = reviewNotes || application.reviewNotes;
    application.reviewedAt = Date.now();
    application.reviewedBy = req.user.id;
    await application.save();

    // Update pet status based on application decision
    if (status === 'approved') {
      pet.status = 'adopted';
      await pet.save();

      // Reject all other pending applications for this pet
      await Application.updateMany(
        { 
          pet: pet._id, 
          _id: { $ne: application._id },
          status: 'pending' 
        },
        { 
          status: 'rejected',
          reviewNotes: 'Another application was approved for this pet',
          reviewedAt: Date.now()
        }
      );
    } else if (status === 'rejected') {
      // Check if there are other pending applications
      const pendingCount = await Application.countDocuments({
        pet: pet._id,
        status: 'pending'
      });

      // If no pending applications, set pet back to available
      if (pendingCount === 0) {
        pet.status = 'available';
        await pet.save();
      }
    }

    const updatedApplication = await Application.findById(application._id)
      .populate('pet')
      .populate('user', 'name email')
      .populate('reviewedBy', 'name');

    res.json({ 
      success: true, 
      message: `Application ${status} successfully`, 
      data: updatedApplication 
    });
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(400).json({ 
      success: false, 
      message: 'Error updating application', 
      error: error.message 
    });
  }
});

// @route   DELETE /api/applications/:id
// @desc    Withdraw application
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Application not found' 
      });
    }

    // Only the applicant can withdraw
    if (application.user.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to withdraw this application' 
      });
    }

    // Can only withdraw pending applications
    if (application.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Can only withdraw pending applications' 
      });
    }

    application.status = 'withdrawn';
    await application.save();

    // Check if there are other pending applications for this pet
    const pendingCount = await Application.countDocuments({
      pet: application.pet,
      status: 'pending'
    });

    // If no pending applications, set pet back to available
    if (pendingCount === 0) {
      await Pet.findByIdAndUpdate(application.pet, { status: 'available' });
    }

    res.json({ 
      success: true, 
      message: 'Application withdrawn successfully' 
    });
  } catch (error) {
    console.error('Error withdrawing application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error withdrawing application', 
      error: error.message 
    });
  }
});

module.exports = router;