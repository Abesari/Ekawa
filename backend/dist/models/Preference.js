"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const preferenceSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    theme: { type: String },
    notificationSettings: { type: String },
    language: { type: String },
});
const Preference = mongoose_1.default.model('Preference', preferenceSchema);
exports.default = Preference;
