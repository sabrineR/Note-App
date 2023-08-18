import db from "../models/index.js";
const NoteModel = db.notes;
export default function noteRepositoryMysqlDB() {
  const findAll = (params) => {
    const { userId } = params;
    return NoteModel.findAll({
      where: { userId: userId },
      order: [
        ["createdAt", "DESC"], //trie dans l'ordre anti-chronologique de création.
      ],
    });
  };

  const add = (noteEntity) => {
    return NoteModel.create({
      content: noteEntity.getContent(),
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
      userId: noteEntity.getUserId(),
    });
  };

  const updateById = async (params) => {
    const { id, content, userId } = params;
    const noteToUpdate = await NoteModel.findOne({
      where: {
        id: id,
      },
    });
    let error;
    if (!noteToUpdate) {
      error = new Error("Cet identifiant est inconnu");
      error.statusCode = 404;
      throw error;
    }
    if (noteToUpdate.userId !== userId) {
      error = new Error("Accès non autorisé à cette note");
      error.statusCode = 403;
      throw error;
    }
    // Update node
    noteToUpdate.content = content;
    noteToUpdate.lastUpdatedAt = new Date();
    await noteToUpdate.save();
    return noteToUpdate;
  };

  const deleteNoteById = async (params) => {
    const { id, userId } = params;
    const note = await NoteModel.findOne({ where: { id } });
    const found = !!note === true;
    let error;
    if (!found) {
      error = new Error("Cet identifiant est inconnu");
      error.statusCode = 404;
      throw error;
    }
    if (note.userId !== userId) {
      error = new Error("Accès non autorisé à cette note");
      error.statusCode = 403;
      throw error;
    }
    return NoteModel.destroy({ where: { id, userId } });
  };

  return {
    findAll,
    add,
    updateById,
    deleteNoteById,
  };
}
