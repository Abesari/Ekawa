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
const Reminder_1 = __importDefault(require("../models/Reminder"));
const router = express_1.default.Router();
// Helper function to determine if the object is an instance of Error
function isError(error) {
    return error instanceof Error;
}
// Create a new reminder
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminder = new Reminder_1.default(req.body);
        yield reminder.save();
        res.status(201).json(reminder);
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
// Get all reminders
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminders = yield Reminder_1.default.find().populate('taskID habitID');
        res.json(reminders);
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
// Get a single reminder by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminder = yield Reminder_1.default.findById(req.params.id).populate('taskID habitID');
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.json(reminder);
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
// Update a reminder by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminder = yield Reminder_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('taskID habitID');
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
        }
        res.json(reminder);
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
// Delete a reminder by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reminder = yield Reminder_1.default.findByIdAndDelete(req.params.id);
        if (!reminder) {
            return res.status(404).json({ message: 'Reminder not found' });
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
