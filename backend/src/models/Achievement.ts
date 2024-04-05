import mongoose, { Document } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
}

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  criteria: { type: String, required: true },
  points: { type: Number, default: 0 },
});

const Achievement = mongoose.model<IAchievement>('Achievement', achievementSchema);

export default Achievement;