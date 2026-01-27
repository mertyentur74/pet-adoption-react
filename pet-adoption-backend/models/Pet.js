const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    enum: ['dog', 'cat', 'bird', 'rabbit', 'other'],
    lowercase: true
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age must be positive']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female'],
    lowercase: true
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    enum: ['small', 'medium', 'large'],
    lowercase: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  medicalHistory: {
    type: String,
    default: 'No medical history recorded'
  },
  vaccinated: {
    type: Boolean,
    default: false
  },
  neutered: {
    type: Boolean,
    default: false
  },
  houseTrained: {
    type: Boolean,
    default: false
  },
  goodWithKids: {
    type: Boolean,
    default: false
  },
  goodWithPets: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Pet+Image'
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'adopted'],
    default: 'available',
    lowercase: true
  },
  adoptionFee: {
    type: Number,
    default: 0,
    min: [0, 'Adoption fee must be positive']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
petSchema.index({ type: 1, status: 1 });
petSchema.index({ shelter: 1 });
petSchema.index({ name: 'text', breed: 'text', description: 'text' });

module.exports = mongoose.model('Pet', petSchema);