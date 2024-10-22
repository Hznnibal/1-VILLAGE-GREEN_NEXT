import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { clients, fournisseurs, rubriques, produits } from '../app/lib/placeholder-data';
import { Client, Fournisseur, Rubrique, Produit, TypeClient, BonDeLivraison, Commande, Concerne, Asso7, Livree } from '../app/lib/definitions'; // Import des types définis

const client = await db.connect();

async function seedClients() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS client (
      ref_client SERIAL PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      prenom VARCHAR(255) NOT NULL,
      adresse TEXT NOT NULL,
      code_postal VARCHAR(10) NOT NULL,
      ville VARCHAR(255) NOT NULL,
      téléphone VARCHAR(15) NOT NULL,
      email TEXT NOT NULL UNIQUE,  -- Colonne email doit être unique
      commercial_rattache VARCHAR(255) NOT NULL,
      password TEXT NOT NULL
    );
  `;

  const insertedClients = await Promise.all(
    clients.map(async (clientData: Client) => {
      const hashedPassword = await bcrypt.hash(clientData.password, 10);
      return client.sql`
        INSERT INTO client (nom, prenom, adresse, code_postal, ville, téléphone, email, commercial_rattache, password)
        VALUES (${clientData.nom}, ${clientData.prenom}, ${clientData.adresse}, ${clientData.code_postal}, ${clientData.ville}, ${clientData.téléphone}, ${clientData.email}, ${clientData.commercial_rattache}, ${hashedPassword})
        ON CONFLICT (email) DO NOTHING;
      `;
    }),
  );

  return insertedClients;
}

async function seedFournisseurs() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS fournisseur (
      Id_Fournisseur SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      telephone VARCHAR(15) NOT NULL,
      adresse TEXT NOT NULL,
      nom VARCHAR(255) NOT NULL UNIQUE -- Colonne nom doit être unique
    );
  `;

  const insertedFournisseurs = await Promise.all(
    fournisseurs.map((fournisseur: Fournisseur) => client.sql`
      INSERT INTO fournisseur (email, telephone, adresse, nom)
      VALUES (${fournisseur.email}, ${fournisseur.telephone}, ${fournisseur.adresse}, ${fournisseur.nom})
      ON CONFLICT (nom) DO NOTHING;
    `),
  );

  return insertedFournisseurs;
}

async function seedRubriques() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS rubrique (
      id_rubrique SERIAL PRIMARY KEY,
      libelle VARCHAR(255) NOT NULL UNIQUE,  -- Colonne libelle doit être unique
      image TEXT NOT NULL,
      active BOOLEAN NOT NULL,
      id_rubrique_1 INT
    );
  `;

  const insertedRubriques = await Promise.all(
    rubriques.map((rubrique: Rubrique) => client.sql`
      INSERT INTO rubrique (libelle, image, active, id_rubrique_1)
      VALUES (${rubrique.libelle}, ${rubrique.image}, ${rubrique.active}, ${rubrique.id_rubrique_1})
      ON CONFLICT (libelle) DO NOTHING;
    `),
  );

  return insertedRubriques;
}

async function seedProduits() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS produit (
      id_produit SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      photo TEXT NOT NULL,
      active BOOLEAN NOT NULL,
      libelle VARCHAR(255) NOT NULL UNIQUE,  -- Colonne libelle doit être unique
      prix DECIMAL(10, 2) NOT NULL,
      Id_Fournisseur INT REFERENCES fournisseur(Id_Fournisseur),
      id_rubrique INT REFERENCES rubrique(id_rubrique)
    );
  `;

  const insertedProduits = await Promise.all(
    produits.map((produit: Produit) => client.sql`
      INSERT INTO produit (description, photo, active, libelle, prix, Id_Fournisseur, id_rubrique)
      VALUES (${produit.description}, ${produit.photo}, ${produit.active}, ${produit.libelle}, ${produit.prix}, ${produit.id_fournisseur}, ${produit.id_rubrique})
      ON CONFLICT (libelle) DO NOTHING;
    `),
  );

  return insertedProduits;
}

async function seedTypeClient() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS type_client (
      Id_type_client SERIAL PRIMARY KEY,
      type_client VARCHAR(255) NOT NULL,
      ref_client INT REFERENCES client(ref_client)
    );
  `;

  // Ajoutez la logique pour insérer des types de clients ici si nécessaire
}

async function seedCommande() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS commande (
      Id_Commande SERIAL PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      total DECIMAL(10, 2) NOT NULL,
      etat VARCHAR(50) NOT NULL,
      date_commande DATE NOT NULL,
      adresse_livraison TEXT NOT NULL,
      ref_client INT REFERENCES client(ref_client)
    );
  `;

  // Ajoutez la logique pour insérer des commandes ici si nécessaire
}

async function seedBonDeLivraison() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS bon_de_livraison (
      Id_Bon_de_livraison SERIAL PRIMARY KEY,
      reference VARCHAR(255) NOT NULL
    );
  `;

  // Ajoutez la logique pour insérer des bons de livraison ici si nécessaire
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedClients();
    await seedFournisseurs();
    await seedRubriques();
    await seedProduits();
    await seedTypeClient();
    await seedCommande();
    await seedBonDeLivraison();
    await client.sql`COMMIT`;

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }));
  } catch (error) {
    await client.sql`ROLLBACK`;
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
