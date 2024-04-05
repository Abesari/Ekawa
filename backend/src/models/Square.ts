import mongoose, { Document } from 'mongoose';

export interface ISquare extends Document {
  userID: mongoose.Types.ObjectId;
  title: string;
  description: string;
  position: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const squareSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  position: { type: String },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Square = mongoose.model<ISquare>('Square', squareSchema);

export default Square;