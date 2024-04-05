"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reminderSchema = new mongoose_1.default.Schema({
    taskID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Task' },
    habitID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Habit' },
    message: { type: String, required: true },
    reminderTime: { type: Date, required: true },
    recurring: { type: Boolean, default: false },
});
const Reminder = mongoose_1.default.model('Reminder', reminderSchema);
exports.default = Reminder;
