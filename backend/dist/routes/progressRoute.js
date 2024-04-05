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
const Progress_1 = __importDefault(require("../models/Progress"));
const router = express_1.default.Router();
// Helper function to determine if the object is an instance of Error
function isError(error) {
    return error instanceof Error;
}
// Create a new progress entry
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = new Progress_1.default(req.body);
        yield progress.save();
        res.status(201).json(progress);
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
// Get all progress entries
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield Progress_1.default.find().populate('habitID');
        res.json(progress);
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
// Get a single progress entry by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield Progress_1.default.findById(req.params.id).populate('habitID');
        if (!progress) {
            return res.status(404).json({ message: 'Progress entry not found' });
        }
        res.json(progress);
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
// Update a progress entry by ID
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield Progress_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }).populate('habitID');
        if (!progress) {
            return res.status(404).json({ message: 'Progress entry not found' });
        }
        res.json(progress);
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
// Delete a progress entry by ID
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const progress = yield Progress_1.default.findByIdAndDelete(req.params.id);
        if (!progress) {
            return res.status(404).json({ message: 'Progress entry not found' });
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
