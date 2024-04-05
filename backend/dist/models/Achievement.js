"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const achievementSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    criteria: { type: String, required: true },
    points: { type: Number, default: 0 },
});
const Achievement = mongoose_1.default.model('Achievement', achievementSchema);
exports.default = Achievement;
