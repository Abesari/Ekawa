"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const goalSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    points: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});
const Goal = mongoose_1.default.model('Goal', goalSchema);
exports.default = Goal;
