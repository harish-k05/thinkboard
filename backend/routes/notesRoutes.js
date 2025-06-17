import express from 'express';
import Note from '../models/Note.js';

const router = express.Router();

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific note
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new note
router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a note
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            note.title = req.body.title || note.title;
            note.content = req.body.content || note.content;
            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note) {
            await note.deleteOne();
            res.json({ message: 'Note deleted' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 