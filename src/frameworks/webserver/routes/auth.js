import authController from "../../../adapters/controllers/authController.js";
import userDbRepository from "../../../application/reposotories/userDbRepository.js";
import userRepositoryMysqlDB from "../../database/sequelize/reposotories/userRepositoryMysqlDB.js";
import authServiceInterface from "../../../application/services/authService.js";
import authServiceImpl from "../../services/authService.js";
import { registerRules } from "../middlewares/validator.js";
import { validator } from "../middlewares/validator.js";
export default function authRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepository,
    userRepositoryMysqlDB,
    authServiceInterface,
    authServiceImpl
  );

  // POST enpdpoints
  router.post("/", registerRules(), validator, controller.loginUser);

  return router;
}
