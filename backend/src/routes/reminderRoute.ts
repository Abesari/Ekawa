import express, { Request, Response } from 'express';
import Reminder from '../models/Reminder';

const router = express.Router();

// Helper function to determine if the object is an instance of Error
function isError(error: any): error is Error {
  return error instanceof Error;
}

// Create a new reminder
router.post('/', async (req: Request, res: Response) => {
  try {
    const reminder = new Reminder(req.body);
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get all reminders
router.get('/', async (req: Request, res: Response) => {
  try {
    const reminders = await Reminder.find().populate('taskID habitID');
    res.json(reminders);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get a single reminder by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findById(req.params.id).populate('taskID habitID');
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Update a reminder by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('taskID habitID');
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.json(reminder);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Delete a reminder by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Reminder not found' });
    }
    res.sendStatus(204);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

export default router;