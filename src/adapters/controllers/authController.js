import login from "../../application/use_cases/auth/login.js";
export default function authController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      let token = await login(username, password, dbRepository, authService);
      res.json({ token: token });
    } catch (error) {
      res.status(error.statusCode).json({ error: error.message });
    }
  };
  return {
    loginUser,
  };
}
