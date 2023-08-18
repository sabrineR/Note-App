export default function updateNote(params, noteRepository) {
  // validate
  if (!params.content) {
    throw new Error("le champ de contenu ne peut pas être vide");
  }
  return noteRepository.updateById(params);
}
