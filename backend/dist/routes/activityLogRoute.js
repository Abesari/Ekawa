"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ActivityLog_1 = __importDefault(require("../models/ActivityLog"));
const router = express_1.default.Router();
// Helper function to determine if the object is an instance of Error
function isError(error) {
    return error instanceof Error;
}
// Create a new activity log entry
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityLog = new ActivityLog_1.default(req.body);
        yield activityLog.save();
        res.status(201).json(activityLog);
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).json({ message: error.message });
        }
        else {
            console.error('An unknown error occurred:', error);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    }
}));
// Get all activity log entries
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityLogs = yield ActivityLog_1.default.find().populate('userID');
        res.json(activityLogs);
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('An unknown error occurred:', error);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    }
}));
// Get a single activity log entry by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityLog = yield ActivityLog_1.default.findById(req.params.id).populate('userID');
        if (!activityLog) {
            return res.status(404).json({ message: 'Activity log entry not found' });
        }
        res.json(activityLog);
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('An unknown error occurred:', error);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    }
}));
// Update an activity log entry by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityLog = yield ActivityLog_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('userID');
        if (!activityLog) {
            return res.status(404).json({ message: 'Activity log entry not found' });
        }
        ;
        res.json(activityLog);
    }
    catch (error) {
        if (isError(error)) {
            res.status(400).json({ message: error.message });
        }
        else {
            console.error('An unknown error occurred:', error);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    }
}));
// Delete an activity log entry by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityLog = yield ActivityLog_1.default.findByIdAndDelete(req.params.id);
        if (!activityLog) {
            return res.status(404).json({ message: 'Activity log entry not found' });
        }
        res.sendStatus(204);
    }
    catch (error) {
        if (isError(error)) {
            res.status(500).json({ message: error.message });
        }
        else {
            console.error('An unknown error occurred:', error);
            res.status(500).json({ message: 'An internal server error occurred' });
        }
    }
}));
exports.default = router;
