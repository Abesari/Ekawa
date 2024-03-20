import express from 'express';
import Goal from '../models/Goal';

const router = express.Router();

// Get all goals
router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new goal
router.post('/', async (req, res) => {
  try {
    const newGoal = new Goal(req.body);
    const savedGoal = await newGoal.save();
    res.json(savedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;