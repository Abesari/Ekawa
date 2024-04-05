import express, { Request, Response } from 'express';
import Square from '../models/Square';

const router = express.Router();

// Helper function to determine if the object is an instance of Error
function isError(error: any): error is Error {
  return error instanceof Error;
}

// Create a new square
router.post('/', async (req: Request, res: Response) => {
  try {
    const square = new Square(req.body);
    await square.save();
    res.status(201).json(square);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get all squares
router.get('/', async (req: Request, res: Response) => {
  try {
    const squares = await Square.find();
    res.json(squares);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Get a single square by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const square = await Square.findById(req.params.id);
    if (!square) {
      return res.status(404).json({ message: 'Square not found' });
    }
    res.json(square);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(500).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Update a square by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const square = await Square.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!square) {
      return res.status(404).json({ message: 'Square not found' });
    }
    res.json(square);
  } catch (error: unknown) {
    if (isError(error)) {
      res.status(400).json({ message: error.message });
    } else {
      console.error('An unknown error occurred:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  }
});

// Delete a square by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const square = await Square.findByIdAndDelete(req.params.id);
    if (!square) {
      return res.status(404).json({ message: 'Square not found' });
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