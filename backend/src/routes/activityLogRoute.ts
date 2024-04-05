import express, { Request, Response } from 'express';
import ActivityLog from '../models/ActivityLog';

const router = express.Router();

// Helper function to determine if the object is an instance of Error
function isError(error: any): error is Error {
  return error instanceof Error;
}

// Create a new activity log entry
router.post('/', async (req: Request, res: Response) => {
  try {
    const activityLog = new ActivityLog(req.body);
    await activityLog.save();
    res.status(201).json(activityLog);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get all activity log entries
router.get('/', async (req: Request, res: Response) => {
  try {
    const activityLogs = await ActivityLog.find().populate('userID');
    res.json(activityLogs);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get a single activity log entry by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activityLog = await ActivityLog.findById(req.params.id).populate('userID');
    if (!activityLog) {
      return res.status(404).json({ message: 'Activity log entry not found' });
    }
    res.json(activityLog);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Update an activity log entry by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const activityLog = await ActivityLog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('userID');
    if (!activityLog) {
      return res.status(404).json({ message: 'Activity log entry not found' });
    };
    res.json(activityLog);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Delete an activity log entry by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const activityLog = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!activityLog) {
      return res.status(404).json({ message: 'Activity log entry not found' });
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