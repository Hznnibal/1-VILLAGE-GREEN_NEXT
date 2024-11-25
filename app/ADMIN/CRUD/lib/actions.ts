"use server";

import {
  createFournisseur,
  createProduct,
  createRubrique,
  deleteFournisseurById,
  deleteProductById,
  deleteRubriqueById,
  updateFournisseurById,
  updateProductById,
  updateRubriqueById,
} from "@/app/ADMIN/CRUD/lib/data";
import {
  fournisseurSchema,
  productSchema,
  rubriqueSchema,
} from "@/app/ADMIN/CRUD/lib/schemas";
import { Fournisseur, Rubrique } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

/* PRODUITS */

export const handleDeleteProductAction = async (id_produit: number) => {
  await deleteProductById(id_produit);
  revalidatePath("/admindashboard/rubriques/produits", "page");
  redirect("/admindashboard/rubriques/produits");
};

export const handleCreateProductAction = async (
  product: z.infer<typeof productSchema>
) => {
  await createProduct(product);
  revalidatePath("/admindashboard/rubriques/produits", "page");
  redirect("/admindashboard/rubriques/produits");
};

export const handleEditProductAction = async (
  id_produit: number,
  product: z.infer<typeof productSchema>
) => {
  await updateProductById(id_produit, product);
  revalidatePath("/admindashboard/rubriques/produits", "page");
  redirect("/admindashboard/rubriques/produits");
};

/* RUBRIQUES */

export const handleDeleteRubriqueAction = async (id_rubrique: number) => {
  await deleteRubriqueById(id_rubrique);
  revalidatePath("/admindashboard/rubriques/rubriques", "page");
  redirect("/admindashboard/rubriques/rubriques");
};

export const handleCreateRubriqueAction = async (rubrique: Rubrique) => {
  await createRubrique(rubrique);
  revalidatePath("/admindashboard/rubriques/rubriques", "page");
  redirect("/admindashboard/rubriques/rubriques");
};

export const handleEditRubriqueAction = async (
  id_rubrique: number,
  rubrique: z.infer<typeof rubriqueSchema>
) => {
  await updateRubriqueById(id_rubrique, rubrique);
  revalidatePath("/admindashboard/rubriques/rubriques", "page");
  redirect("/admindashboard/rubriques/rubriques");
};

/* FOURNISSEURS */

export const handleDeleteFournisseurAction = async (id_fournisseur: number) => {
  await deleteFournisseurById(id_fournisseur);
  revalidatePath("/admindashboard/rubriques/fournisseur", "page");
  redirect("/admindashboard/rubriques/fournisseur");
};

export const handleCreateFournisseurAction = async (
  fournisseur: Fournisseur
) => {
  await createFournisseur(fournisseur);
  revalidatePath("/admindashboard/rubriques/fournisseur", "page");
  redirect("/admindashboard/rubriques/fournisseur");
};

export const handleEditFournisseurAction = async (
  id_fournisseur: number,
  fournisseur: z.infer<typeof fournisseurSchema>
) => {
  await updateFournisseurById(id_fournisseur, fournisseur);
  revalidatePath("/admindashboard/rubriques/fournisseur", "page");
  redirect("/admindashboard/rubriques/fournisseur");
};
