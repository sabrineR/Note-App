import addNote from "../../application/use_cases/note/createNote.js";
import findAll from "../../application/use_cases/note/getAllNotes.js";
import deleteNote from "../../application/use_cases/note/deleteNote.js";
import updateNote from "../../application/use_cases/note/updateNote.js";

export default function noteController(noteDbRepository, noteDbRepositoryImpl) {
  const dbRepository = noteDbRepository(noteDbRepositoryImpl());
  // Fetch all the notes
  const fetchAllNotes = async (req, res) => {
    const params = {};
    params.userId = req.user.id;
    try {
      let notes = await findAll(params, dbRepository);
      return res.json(notes);
    } catch (error) {
      res.json({ error: error.message });
    }
  };
  //create new note
  const addNewNote = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id;
    try {
      let note = await addNote({
        content,
        userId,
        noteRepository: dbRepository,
      });
      return res.status(201).json({ note: note });
    } catch (error) {
      res.status(405).json({ error: error.message });
    }
  };

  //delete note
  const deleteNoteById = async (req, res) => {
    const params = {
      id: req.params.id,
      userId: req.user.id,
    };
    try {
      await deleteNote(params, dbRepository);
      res.json({ msg: "Note supprimée avec succès !" });
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message });
    }
  };
  //update note
  const updateNoteById = async (req, res) => {
    const { content } = req.body;
    const params = {
      id: req.params.id,
      userId: req.user.id,
      content,
    };
    try {
      let newNote = await updateNote(params, dbRepository);
      res.json({ note: newNote });
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message });
    }
  };

  return {
    fetchAllNotes,
    addNewNote,
    updateNoteById,
    deleteNoteById,
  };
}
