const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicantInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  housingInfo: {
    type: {
      type: String,
      enum: ['house', 'apartment', 'condo', 'other'],
      required: true
    },
    ownership: {
      type: String,
      enum: ['own', 'rent'],
      required: true
    },
    landlordApproval: {
      type: Boolean,
      default: false
    },
    yardAccess: {
      type: Boolean,
      default: false
    }
  },
  experience: {
    hadPetsBefore: {
      type: Boolean,
      required: true
    },
    currentPets: {
      type: String,
      default: 'None'
    },
    petExperience: {
      type: String,
      default: ''
    }
  },
  lifestyle: {
    householdMembers: {
      type: Number,
      required: true,
      min: 1
    },
    childrenAges: {
      type: String,
      default: 'None'
    },
    activityLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      required: true
    },
    timeAlone: {
      type: String,
      required: true
    }
  },
  motivation: {
    type: String,
    required: true,
    maxlength: 1000
  },
  veterinarianInfo: {
    name: String,
    phone: String,
    clinic: String
  },
  references: [{
    name: String,
    relationship: String,
    phone: String
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  reviewNotes: {
    type: String,
    default: ''
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
applicationSchema.index({ user: 1, pet: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);