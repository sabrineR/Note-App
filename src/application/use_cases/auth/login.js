export default async function login(
  username,
  password,
  userRepository,
  authService
) {
  if (!username || !password) {
    const error = new Error(
      "Les champs identifiant et mot de passe ne peuvent pas être vides"
    );
    error.statusCode = 401;
    throw error;
  }

  try {
    const user = await userRepository.findByProperty({ username });
    if (!user) {
      const error = new Error("Cet identifiant est inconnu");
      error.statusCode = 403;
      throw error;
    }

    const isMatch = authService.compare(password, user.password);

    if (!isMatch) {
      const error = new Error("mot de passe invalide");
      error.statusCode = 401;
      throw error;
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    return authService.generateToken(payload);
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    throw error;
  }
}
