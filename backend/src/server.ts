import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes will be added here

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});