import userController from "../../../adapters/controllers/userController.js";
import userDbRepository from "../../../application/reposotories/userDbRepository.js";
import userRepositoryMysqlDB from "../../database/sequelize/reposotories/userRepositoryMysqlDB.js";
import authServiceInterface from "../../../application/services/authService.js";
import authServiceImpl from "../../services/authService.js";
import { registerRules, validator } from "../middlewares/validator.js";
export default function userRouter(express) {
  const router = express.Router();
  // load controller with dependencies
  const controller = userController(
    userDbRepository,
    userRepositoryMysqlDB,
    authServiceInterface,
    authServiceImpl
  );
  // Register enpdpoints
  router.post("/", registerRules(), validator, controller.register);

  return router;
}
