export default function noteRepository(repository) {
  const add = (note) => repository.add(note);
  const findAll = (params) => repository.findAll(params);
  const deleteNoteById = (params) => repository.deleteNoteById(params);
  const updateById = (params) => repository.updateById(params);
  return {
    add,
    findAll,
    deleteNoteById,
    updateById,
  };
}
