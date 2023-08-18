export default function deleteNoteById(params, noteRepository) {
  return noteRepository.deleteNoteById(params);
}
