import mongoose, { Document } from 'mongoose';

export interface IProgress extends Document {
  habitID: mongoose.Types.ObjectId;
  date: Date;
  status: string;
  note: string;
  points: number;
}

const progressSchema = new mongoose.Schema({
  habitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  note: { type: String },
  points: { type: Number, default: 0 },
});

const Progress = mongoose.model<IProgress>('Progress', progressSchema);

export default Progress;