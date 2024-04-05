import mongoose, { Document } from 'mongoose';

export interface IPreference extends Document {
  userID: mongoose.Types.ObjectId;
  theme: string;
  notificationSettings: string;
  language: string;
}

const preferenceSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String },
  notificationSettings: { type: String },
  language: { type: String },
});

const Preference = mongoose.model<IPreference>('Preference', preferenceSchema);

export default Preference;