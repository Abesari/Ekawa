import express, { Request, Response } from 'express';
import Preference from '../models/Preference';

const router = express.Router();

// Helper function to determine if the object is an instance of Error
function isError(error: any): error is Error {
  return error instanceof Error;
}

// Create a new preference
router.post('/', async (req: Request, res: Response) => {
  try {
    const preference = new Preference(req.body);
    await preference.save();
    res.status(201).json(preference);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get all preferences
router.get('/', async (req: Request, res: Response) => {
  try {
    const preferences = await Preference.find().populate('userID');
    res.json(preferences);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get a single preference by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const preference = await Preference.findById(req.params.id).populate('userID');
    if (!preference) {
      return res.status(404).json({ message: 'Preference not found' });
    }
    res.json(preference);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Update a preference by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const preference = await Preference.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('userID');
    if (!preference) {
      return res.status(404).json({ message: 'Preference not found' });
    }
    res.json(preference);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Delete a preference by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const preference = await Preference.findByIdAndDelete(req.params.id);
    if (!preference) {
      return res.status(404).json({ message: 'Preference not found' });
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