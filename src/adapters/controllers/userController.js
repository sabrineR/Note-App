import addUser from "../../application/use_cases/user/createUser.js";
export default function userController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const register = async (req, res) => {
    const { username, password } = req.body;
    try {
      let user = await addUser(username, password, dbRepository, authService);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  return {
    register,
  };
}
