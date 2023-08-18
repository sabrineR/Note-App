import dbConfig from "../config/config.js";
import { Sequelize, DataTypes } from "sequelize";
import defineNoteModel from './note.js';
import defineUserModel from "./user.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize
  .authenticate()
  .then(() => {
    console.log("'La connexion a été établie avec succès.");
  })
  .catch((err) => {
    console.log("Impossible de se connecter à la base de données:" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.notes = defineNoteModel(sequelize, DataTypes);
db.users = defineUserModel(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

// 1 to Many Relation users and notes
db.users.hasMany(db.notes, {
  as: "notes",
});

db.notes.belongsTo(db.users, {
  foreignKey: "userId",
  as: "user",
});

export default db
