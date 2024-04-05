import express, { Request, Response } from 'express';
import Progress from '../models/Progress';

const router = express.Router();

// Helper function to determine if the object is an instance of Error
function isError(error: any): error is Error {
  return error instanceof Error;
}

// Create a new progress entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get all progress entries
router.get('/', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.find().populate('habitID');
    res.json(progress);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get a single progress entry by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findById(req.params.id).populate('habitID');
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    res.json(progress);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Update a progress entry by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('habitID');
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
    }
    res.json(progress);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Delete a progress entry by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);
    if (!progress) {
      return res.status(404).json({ message: 'Progress entry not found' });
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