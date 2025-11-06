import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerEmail: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  reservationDate: {
    type: Date,
    required: true
  },
  reservationTime: {
    type: String,
    required: true
  },
  specialRequests: {
    type: String,
    trim: true,
    default: ''
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'confirmed'
  },
  tableNumber: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient querying
reservationSchema.index({ reservationDate: 1, reservationTime: 1, tableNumber: 1 });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;