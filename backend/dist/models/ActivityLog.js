"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activityLogSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String },
    points: { type: Number, default: 0 },
});
const ActivityLog = mongoose_1.default.model('ActivityLog', activityLogSchema);
exports.default = ActivityLog;
