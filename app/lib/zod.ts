import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "L'email est requis" })
    .min(1, "L'email est requis")
    .email("Email invalide"),
  password: string({ required_error: "Le mot de passe est requis" })
    .min(1, "Le mot de passe est requis")
    .min(8, "Le mot de passe doit contenir plus de 8 caractéres")
    .max(32, "Le mot de passe doit contenir moins de 32 caractéres"),
})