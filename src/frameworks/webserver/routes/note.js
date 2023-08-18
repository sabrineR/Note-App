import noteDbRepository from "../../../application/reposotories/noteDbRepository.js";
import noteRepositoryMysqlDB from "../../database/sequelize/reposotories/noteRepositoryMysqlDB.js";
import noteController from "../../../adapters/controllers/noteController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

export default function noteRouter(express) {
  const router = express.Router();
  // load controller with dependencies
  const controller = noteController(noteDbRepository, noteRepositoryMysqlDB);
  // GET endpoints
  router.get("/", authMiddleware, controller.fetchAllNotes);
  // POST endpoints
  router.post("/", authMiddleware, controller.addNewNote);

  // PUT endpoints
  router.put("/:id", authMiddleware, controller.updateNoteById);

  // DELETE endpoints
  router.delete("/:id", authMiddleware, controller.deleteNoteById);

  return router;
}
