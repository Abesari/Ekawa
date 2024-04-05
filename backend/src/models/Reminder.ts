import mongoose, { Document } from 'mongoose';

export interface IReminder extends Document {
  taskID?: mongoose.Types.ObjectId;
  habitID?: mongoose.Types.ObjectId;
  message: string;
  reminderTime: Date;
  recurring: boolean;
}

const reminderSchema = new mongoose.Schema({
  taskID: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  habitID: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
  message: { type: String, required: true },
  reminderTime: { type: Date, required: true },
  recurring: { type: Boolean, default: false },
});

const Reminder = mongoose.model<IReminder>('Reminder', reminderSchema);

export default Reminder;