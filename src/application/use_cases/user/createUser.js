import user from "../../../entities/user.js";
export default async function addUser(
  username,
  password,
  userRepository,
  authService
) {
  if (!username || !password) {
    throw new Error(
      "nom d'utilisateur et mot de passe ne peuvent pas être vides"
    );
  }
  const searchUserName = await userRepository.findByProperty({ username });
  if (searchUserName)
    throw new Error(`Cet identifiant est déjà associé à un compte`);
  const newUser = user(username, authService.encryptPassword(password));
  return userRepository.add(newUser);
}
