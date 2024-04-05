import mongoose, { Document } from 'mongoose';

export interface IActivityLog extends Document {
  userID: mongoose.Types.ObjectId;
  activityType: string;
  timestamp: Date;
  details: string;
  points: number;
}

const activityLogSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: String },
  points: { type: Number, default: 0 },
});

const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);

export default ActivityLog;