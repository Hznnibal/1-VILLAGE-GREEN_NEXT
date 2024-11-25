import { sql } from '@vercel/postgres';
import { Produit, Fournisseur, Rubrique } from '@/app/lib/definitions';
import { productSchema } from './schemas';
import { z } from 'zod';

/* PRODUIT */

export const createProduct = async (product: z.infer<typeof productSchema>) => {
  try {
      const result = await sql`
          INSERT INTO Produit (description, photo, active, libelle, prix, id_fournisseur, id_rubrique)
          VALUES (${product.description}, ${product.photo}, ${product.active}, ${product.libelle}, ${product.prix}, ${product.id_fournisseur}, ${product.id_rubrique})
          RETURNING id_produit
      `;
      return { error: "", id_produit: result.rows[0]?.id_produit };
  } catch (error) {
      console.error(`Error at createProduct -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

  export async function fetchProduitById(id_produit: number) {
    try {
      const data = await sql<Produit>`
        SELECT
          id_produit,
          description,
          photo,
          active,
          libelle,
          prix,
          id_fournisseur,
          id_rubrique
        FROM Produit
        WHERE id_produit = ${id_produit}
      `;
      return data.rows[0];
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch produit.');
    }
  }

export const updateProductById = async (id_produit: number, product: Partial<z.infer<typeof productSchema>>) => {
    try {
        const result = await sql`
            UPDATE Produit
            SET
                description = ${product.description ?? 'description'},
                photo = ${product.photo ?? 'photo'},
                active = ${product.active ?? true},
                libelle = ${product.libelle ?? 'libelle'},
                prix = ${product.prix ?? 0},
                id_fournisseur = ${product.id_fournisseur ?? null},
                id_rubrique = ${product.id_rubrique ?? null}
            WHERE id_produit = ${id_produit}
            RETURNING *
        `;
        return { error: "", updatedProduct: result.rows[0] };
    } catch (error) {
        console.error(`Error at updateProductById -> ${error}`);
        return { error: "We are facing an issue at this moment." };
    }
};

export const deleteProductById = async (id_produit: number) => {
    try {
        await sql`
            DELETE FROM Produit
            WHERE id_produit = ${id_produit}
        `;
        return { error: "" };
    } catch (error) {
        console.error(`Error at deleteProductById -> ${error}`);
        return { error: "We are facing an issue at this moment." };
    }
};

/* FOURNISSEURS */

// Créer un nouveau fournisseur
export const createFournisseur = async (fournisseur: Fournisseur) => {
  try {
      const result = await sql`
          INSERT INTO Fournisseur (nom, email, telephone, adresse)
          VALUES (${fournisseur.nom}, ${fournisseur.email}, ${fournisseur.telephone}, ${fournisseur.adresse})
          RETURNING id_fournisseur
      `;
      return { error: "", id_fournisseur: result.rows[0]?.id_fournisseur };
  } catch (error) {
      console.error(`Error at createFournisseur -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

// Récupérer un fournisseur par son ID
export async function fetchFournisseurById(id_fournisseur: number) {
  try {
      const data = await sql<Fournisseur>`
          SELECT
              id_fournisseur,
              nom,
              email,
              telephone,
              adresse
          FROM Fournisseur
          WHERE id_fournisseur = ${id_fournisseur}
      `;
      return data.rows[0];
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch fournisseur.');
  }
}

// Mettre à jour un fournisseur par son ID
export const updateFournisseurById = async (id_fournisseur: number, fournisseur: Partial<Fournisseur>) => {
  try {
      const result = await sql`
          UPDATE Fournisseur
          SET
              nom = ${fournisseur.nom ?? 'nom'},
              email = ${fournisseur.email ?? 'email'},
              telephone = ${fournisseur.telephone ?? 'telephone'},
              adresse = ${fournisseur.adresse ?? 'adresse'}
          WHERE id_fournisseur = ${id_fournisseur}
          RETURNING *
      `;
      return { error: "", updatedFournisseur: result.rows[0] };
  } catch (error) {
      console.error(`Error at updateFournisseurById -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

// Supprimer un fournisseur par son ID
export const deleteFournisseurById = async (id_fournisseur: number) => {
  try {
      await sql`
          DELETE FROM Fournisseur
          WHERE id_fournisseur = ${id_fournisseur}
      `;
      return { error: "" };
  } catch (error) {
      console.error(`Error at deleteFournisseurById -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

/* RUBRIQUES */


// Créer une nouvelle rubrique
export const createRubrique = async (rubrique: Rubrique) => {
  try {
      const result = await sql`
          INSERT INTO Rubrique (libelle, image, active, id_rubrique_1)
          VALUES (${rubrique.libelle}, ${rubrique.image}, ${rubrique.active}, ${rubrique.id_rubrique_1})
          RETURNING id_rubrique
      `;
      return { error: "", id_rubrique: result.rows[0]?.id_rubrique };
  } catch (error) {
      console.error(`Error at createRubrique -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

// Récupérer une rubrique par son ID
export async function fetchRubriqueById(id_rubrique: number) {
  try {
      const data = await sql<Rubrique>`
          SELECT
              id_rubrique,
              libelle,
              image,
              active,
              id_rubrique_1
          FROM Rubrique
          WHERE id_rubrique = ${id_rubrique}
      `;
      return data.rows[0];
  } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch rubrique.');
  }
}

// Mettre à jour une rubrique par son ID
export const updateRubriqueById = async (id_rubrique: number, rubrique: Partial<Rubrique>) => {
  try {
      const result = await sql`
          UPDATE Rubrique
          SET
              libelle = ${rubrique.libelle ?? 'libelle'},
              image = ${rubrique.image ?? 'image'},
              active = ${rubrique.active ?? true},
              id_rubrique_1 = ${rubrique.id_rubrique_1 ?? null}
          WHERE id_rubrique = ${id_rubrique}
          RETURNING *
      `;
      return { error: "", updatedRubrique: result.rows[0] };
  } catch (error) {
      console.error(`Error at updateRubriqueById -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};

// Supprimer une rubrique par son ID
export const deleteRubriqueById = async (id_rubrique: number) => {
  try {
      await sql`
          DELETE FROM Rubrique
          WHERE id_rubrique = ${id_rubrique}
      `;
      return { error: "" };
  } catch (error) {
      console.error(`Error at deleteRubriqueById -> ${error}`);
      return { error: "We are facing an issue at this moment." };
  }
};