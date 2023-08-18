const defineNoteModel = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      lastUpdatedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "notes",
      timestamps: false,
    }
  );
  return Note;
};
export default defineNoteModel;
