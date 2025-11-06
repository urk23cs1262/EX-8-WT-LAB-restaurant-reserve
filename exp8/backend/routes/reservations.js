import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// GET all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ reservationDate: 1, reservationTime: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new reservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT update reservation
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;