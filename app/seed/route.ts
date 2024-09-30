import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { clients, fournisseurs, rubriques, produits } from '../lib/placeholder-data';

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
      email TEXT NOT NULL UNIQUE,
      commercial_rattache VARCHAR(255) NOT NULL,
      password TEXT NOT NULL
    );
  `;

  const insertedClients = await Promise.all(
    clients.map(async (clientData) => {
      const hashedPassword = await bcrypt.hash(clientData.password, 10);
      return client.sql`
        INSERT INTO client (nom, prenom, adresse, code_postal, ville, téléphone, email, commercial_rattache, password)
        VALUES (${clientData.nom}, ${clientData.prenom}, ${clientData.adresse}, ${clientData.code_postal}, 
                ${clientData.ville}, ${clientData.téléphone}, ${clientData.email}, ${clientData.commercial_rattache}, 
                ${hashedPassword})
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
      nom VARCHAR(255) NOT NULL
    );
  `;

  const insertedFournisseurs = await Promise.all(
    fournisseurs.map(
      (fournisseur) => client.sql`
        INSERT INTO fournisseur (email, telephone, adresse, nom)
        VALUES (${fournisseur.email}, ${fournisseur.telephone}, ${fournisseur.adresse}, ${fournisseur.nom})
        ON CONFLICT (nom) DO NOTHING;
      `,
    ),
  );

  return insertedFournisseurs;
}

async function seedRubriques() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS rubrique (
      Id_Rubrique SERIAL PRIMARY KEY,
      libelle VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      active BOOLEAN NOT NULL,
      Id_Rubrique_1 INT
    );
  `;

  const insertedRubriques = await Promise.all(
    rubriques.map(
      (rubrique) => client.sql`
        INSERT INTO rubrique (libelle, image, active, Id_Rubrique_1)
        VALUES (${rubrique.libelle}, ${rubrique.image}, ${rubrique.active}, ${rubrique.Id_Rubrique_1})
        ON CONFLICT (libelle) DO NOTHING;
      `,
    ),
  );

  return insertedRubriques;
}

async function seedProduits() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS produit (
      Id_Produit SERIAL PRIMARY KEY,
      description TEXT NOT NULL,
      photo TEXT NOT NULL,
      active BOOLEAN NOT NULL,
      libelle VARCHAR(255) NOT NULL,
      prix DECIMAL(10, 2) NOT NULL,
      Id_Fournisseur INT REFERENCES fournisseur(Id_Fournisseur),
      Id_Rubrique INT REFERENCES rubrique(Id_Rubrique)
    );
  `;

  const insertedProduits = await Promise.all(
    produits.map(
      (produit) => client.sql`
        INSERT INTO produit (description, photo, active, libelle, prix, Id_Fournisseur, Id_Rubrique)
        VALUES (${produit.description}, ${produit.photo}, ${produit.active}, ${produit.libelle}, ${produit.prix},
                ${produit.Id_Fournisseur}, ${produit.Id_Rubrique})
        ON CONFLICT (libelle) DO NOTHING;
      `,
    ),
  );

  return insertedProduits;
}

export async function GET() {
  return new Response(JSON.stringify({
    message:
      'Uncomment this file and remove this line. You can delete this file when you are finished.',
  }));
  // try {
  //   await client.sql`BEGIN`;
  //   await seedClients();
  //   await seedFournisseurs();
  //   await seedRubriques();
  //   await seedProduits();
  //   await client.sql`COMMIT`;

  //   return new Response(JSON.stringify({ message: 'Database seeded successfully' }));
  // } catch (error) {
  //   await client.sql`ROLLBACK`;
  //   return new Response(JSON.stringify({ error }), { status: 500 });
  // }
}
