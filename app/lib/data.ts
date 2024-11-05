import { sql } from '@vercel/postgres';
import {
  Client,
  Produit,
  Fournisseur,
  Commande,
  Concerne,
  BonDeLivraison,
  Rubrique,
  TypeClient,
  Livree,
} from './definitions';
import { formatCurrency } from './utils';


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
      WHERE active = true -- Récupérer uniquement les rubriques actives
      ORDER BY libelle ASC
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch rubriques.');
  }
}


// Fonction pour récupérer les dernières commandes (ou factures)
export async function fetchLatestCommandes() {
  try {
    const data = await sql<Commande>`
      SELECT commande.nom, commande.total, commande.date_commande, client.nom, client.email
      FROM Commande
      JOIN Client ON Commande.ref_client = Client.ref_client
      ORDER BY Commande.date_commande DESC
      LIMIT 5`;

    const latestCommandes = data.rows.map((commande) => ({
      ...commande,
      total: formatCurrency(commande.total),
    }));
    return latestCommandes;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest commandes.');
  }
}

// Fonction pour récupérer des informations de carte (nombre de commandes, clients, etc.)
export async function fetchCardData() {
  try {
    const commandeCountPromise = sql`SELECT COUNT(*) FROM Commande`;
    const clientCountPromise = sql`SELECT COUNT(*) FROM Client`;
    const commandeStatusPromise = sql`SELECT
         SUM(CASE WHEN etat = 'livré' THEN total ELSE 0 END) AS "paid",
         SUM(CASE WHEN etat = 'en attente' THEN total ELSE 0 END) AS "pending"
         FROM Commande`;

    const data = await Promise.all([
      commandeCountPromise,
      clientCountPromise,
      commandeStatusPromise,
    ]);

    const numberOfCommandes = Number(data[0].rows[0].count ?? '0');
    const numberOfClients = Number(data[1].rows[0].count ?? '0');
    const totalPaidCommandes = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingCommandes = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfClients,
      numberOfCommandes,
      totalPaidCommandes,
      totalPendingCommandes,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
// Fonction pour récupérer les commandes filtrées
export async function fetchFilteredCommandes(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const commandes = await sql<Commande>`
      SELECT
        commande.id,
        commande.nom,
        commande.total,
        commande.date_commande,
        commande.etat,
        client.nom AS client_nom,
        client.email AS client_email
      FROM Commande
      JOIN Client ON Commande.ref_client = Client.ref_client
      WHERE
        client.nom ILIKE ${`%${query}%`} OR
        client.email ILIKE ${`%${query}%`} OR
        commande.total::text ILIKE ${`%${query}%`} OR
        commande.date_commande::text ILIKE ${`%${query}%`} OR
        commande.etat ILIKE ${`%${query}%`}
      ORDER BY commande.date_commande DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return commandes.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch commandes.');
  }
}

// Fonction pour récupérer le nombre de pages de commandes
export async function fetchCommandesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM Commande
    JOIN Client ON Commande.ref_client = Client.ref_client
    WHERE
      client.nom ILIKE ${`%${query}%`} OR
      client.email ILIKE ${`%${query}%`} OR
      commande.total::text ILIKE ${`%${query}%`} OR
      commande.date_commande::text ILIKE ${`%${query}%`} OR
      commande.etat ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of commandes.');
  }
}

// Fonction pour récupérer une commande par son ID
export async function fetchCommandeById(id: string) {
  try {
    const data = await sql<Commande>`
      SELECT
        commande.id,
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
type ClientWithInvoices = Client & {
  total_pending: number;
  total_paid: number;
};
// Fonction pour récupérer les clients filtrés
export async function fetchFilteredClients(query: string) {
  try {
    const data = await sql<Client>`
		SELECT
		  client.ref_client,
		  client.nom,
		  client.email,
		  COUNT(commande.id) AS total_commandes,
		  SUM(CASE WHEN commande.etat = 'en attente' THEN commande.total ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN commande.etat = 'livré' THEN commande.total ELSE 0 END) AS total_paid
		FROM Client
		LEFT JOIN Commande ON Client.ref_client = Commande.ref_client
		WHERE
		  client.nom ILIKE ${`%${query}%`} OR
        client.email ILIKE ${`%${query}%`}
		GROUP BY client.ref_client, client.nom, client.email
		ORDER BY client.nom ASC
	  `;

    const clients = data.rows;

    return clients;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch client table.');
  }
}
