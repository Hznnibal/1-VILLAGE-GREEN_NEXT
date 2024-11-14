import { sql } from '@vercel/postgres';
import { Client, Produit, Commande, Rubrique, Fournisseur} from './definitions';

// Fonction pour récupérer tous les produits
export async function fetchProduits() {
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
      WHERE active = true -- On peut ne récupérer que les produits actifs
      ORDER BY libelle ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch produits.');
  }
}

// Fonction pour récupérer toutes les rubriques
export async function fetchRubriques() {
  try {
    const data = await sql<Rubrique>`
      SELECT
        id_rubrique,
        libelle,
        id_rubrique_1
      FROM Rubrique
      ORDER BY libelle ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rubriques.');
  }
}

// Fonction pour récupérer une commande par son ID
export async function fetchCommandeById(id: string) {
  try {
    const data = await sql<Commande>`
      SELECT
        commande.id_commande,
        commande.ref_client,
        commande.total,
        commande.etat
      FROM Commande
      WHERE commande.id = ${id};
    `;

    const commande = data.rows.map((cmd) => ({
      ...cmd,
      total: cmd.total / 100, // Si le montant est en centimes
    }));

    return commande[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch commande.');
  }
}

// Fonction pour récupérer tous les clients
export async function fetchClients() {
  try {
    const data = await sql<Client>`
      SELECT
        ref_client,
        prenom,
        nom,
        email,
      FROM Client
      ORDER BY nom ASC
    `;

    const clients = data.rows;
    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all clients.');
  }
}

export async function fetchFournisseur() {
  try {
    const data = await sql<Fournisseur>`
      SELECT
        id_fournisseur,
        nom,
        adresse,
        telephone,
        email
      FROM Fournisseur
      ORDER BY nom ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch fournisseurs.');
  }
}