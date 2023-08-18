import note from "../../../entities/note.js";
export default function addNote({ content, userId, noteRepository }) {
  if (!content) {
    throw new Error("le champ de contenu ne peut pas être vide");
  }
  const newNote = note({ content, userId });
  return noteRepository.add(newNote);
}
