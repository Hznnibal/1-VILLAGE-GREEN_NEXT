import { z } from "zod";

export const productSchema = z.object({
    libelle: z.string().min(3, { message: "Entrez le nom" }),
    description: z.string().min(3, { message: "Description obligatoire" }),
    prix: z.coerce.number({ invalid_type_error: "Veuillez entrer le prix" }).gte(1, { message: "Le prix doit être supérieur à 1" }),
    photo: z.string(),
    active: z.boolean().default(true),
    id_fournisseur: z.coerce.number(),
    id_rubrique: z.coerce.number(),
});

export const rubriqueSchema = z.object({
    libelle: z.string().min(3, { message: "Entrez le libellé de la rubrique" }),
    image: z.string(),
    // image: z.string().url({ message: "Veuillez entrer une URL valide pour l'image" }),
    active: z.boolean().default(true),
    id_rubrique_1: z.coerce.number().optional(), // Si une rubrique parent existe
    // id_rubrique: z.coerce.number(), // Le rendre optionnel
});

export const fournisseurSchema = z.object({
    nom: z.string().min(3, { message: "Entrez le nom du fournisseur" }),
    email: z.string().email({ message: "Entrez un email valide" }),
    telephone: z.string().min(10, { message: "Numéro de téléphone trop court" }), // Numéro de téléphone (valider selon le format local)
    adresse: z.string().min(3, { message: "Entrez l'adresse du fournisseur" }),
});