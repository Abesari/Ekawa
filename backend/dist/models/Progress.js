"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const progressSchema = new mongoose_1.default.Schema({
    habitID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Habit', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    note: { type: String },
    points: { type: Number, default: 0 },
});
const Progress = mongoose_1.default.model('Progress', progressSchema);
exports.default = Progress;
