import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../../config/config.js";
const JWT_KEY = config.JWT_KEY;

export default function authService() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, JWT_KEY);

  const generateToken = (payload) =>
    jwt.sign(payload, JWT_KEY, {
      expiresIn: "24h",
    });

  return {
    encryptPassword,
    compare,
    verify,
    generateToken,
  };
}
