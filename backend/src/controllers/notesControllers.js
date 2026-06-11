import Note from "../models/Note.js"

export async function getAllNotes (req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc order - newest first
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error In getAllNotes Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getNoteById (req, res) {
    try {
        const noteById = await Note.findById(req.params.id);
        if(!noteById){
            res.status(404).json({ message: "Note Not Found! "});
        }
        res.status(200).json(noteById);
    } catch (error) {
        console.error("Error In getNoteById Controller", error);
        res.status(500).json({ message: "Internal Server Error "});
    }
}

export async function createNote (req, res) {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error("Error In createNote Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function updateNote (req, res) {  
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true});
        if(!updatedNote){
            res.status(404).json({ message: "Note Not Found!"});
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error In updateNote Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function deleteNote (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            res.status(500).json({ message: "Note Not Found!" });
        }
        res.status(200).json({ message: "Note Deleted Successfully!"});
    } catch (error) {
        console.error("Error In deleteNote Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}