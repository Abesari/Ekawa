import mongoose, { Document } from 'mongoose';

export interface IGoal extends Document {
  title: string;
  description: string;
  points: number;
  createdAt: Date;
}

const goalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Goal = mongoose.model<IGoal>('Goal', goalSchema);

export default Goal;