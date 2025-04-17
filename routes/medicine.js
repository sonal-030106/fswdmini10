const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Medicine = require('../models/Medicine');
const auth = require('../middleware/auth');

// Get all medicines for a user
router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine.find({ user: req.user.userId });
    res.json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new medicine
router.post('/', [
  auth,
  body('name').trim().notEmpty().withMessage('Medicine name is required'),
  body('dosage').isIn(['morning', 'evening', 'both']).withMessage('Invalid dosage time'),
  body('timing').trim().notEmpty().withMessage('Timing is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, dosage, timing } = req.body;
    const medicine = new Medicine({
      name,
      dosage,
      timing,
      user: req.user.userId
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update medicine status (mark as taken)
router.put('/:id/taken', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    medicine.isTaken = true;
    await medicine.save();
    res.json(medicine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete medicine
router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 