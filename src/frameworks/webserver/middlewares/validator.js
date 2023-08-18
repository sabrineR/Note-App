import { check, validationResult } from "express-validator";
export const registerRules = () => [
  check("username", "Votre identifiant ne peut pas être vide").notEmpty(),
  check("password", "Votre mot de passe ne peut pas être vide").notEmpty(),
  check(
    "password",
    "Le mot de passe doit contenir au moins 4 caractères"
  ).isLength({ min: 4 }),
  check(
    "username",
    "Votre identifiant doit contenir entre 2 et 20 caractères"
  ).isLength({ min: 2, max: 20 }),
  check("username")
    .matches(/^[a-z]+$/)
    .withMessage(
      "Votre identifiant ne doit contenir que des lettres minuscules non accentuées"
    )
    .customSanitizer((value) => value.toLowerCase()),
];

export const validator = (req, res, next) => {
  const errors = validationResult(req);
  errors.isEmpty()
    ? next()
    : res.status(400).json({
        errors: errors.array(),
      });
};
