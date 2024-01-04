const Note = require('../models/Note');

const createNote = async (req, res, next) => {
    const {title, content} = req.body;
    const newNote = new Note({
        title,
        content
    });
    try {
        await newNote.save();
        res.status(200).json(newNote);
    } catch (error) {
        // res.status(400).json({ message: error.message });
        next(error);
    }
}

const getAllNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

const getNote = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findById(id);
        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
}

//update note
const updateNote = async (req, res, next) => {
    const id = req.params.id;
    const {title, content} = req.body;
    try {
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title;
        note.content = content;
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        next(error);
    }
};

const deleteNote = async (req, res, next) => {
    const id = req.params.id;

    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = {createNote, getAllNotes, getNote, updateNote, deleteNote};