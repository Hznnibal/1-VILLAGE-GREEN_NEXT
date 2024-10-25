// app/api/signup/route.ts

import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres'; // Assurez-vous que le bon chemin est utilisé
import { NextResponse } from 'next/server';

const client = await db.connect();

export async function POST(request: Request) {
  const {
    nom,
    prenom,
    email,
    password,
    adresse,
    code_postal,
    ville,
    téléphone,
  } = await request.json();

  // Hashage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Créer la table si elle n'existe pas (si ce n'est pas déjà fait dans une autre partie de votre code)
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

    // Insérer l'utilisateur dans la base de données
    await client.sql`
      INSERT INTO client (nom, prenom, adresse, code_postal, ville, téléphone, email, commercial_rattache, password)
      VALUES (${nom}, ${prenom}, ${adresse}, ${code_postal}, ${ville}, ${téléphone}, ${email}, '****', ${hashedPassword}) -- Remplacez commercial_rattache par '****'
      ON CONFLICT (email) DO NOTHING;
    `;

    return NextResponse.json({ message: 'Utilisateur créé avec succès.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Une erreur est survenue.' }, { status: 500 });
  } finally {
    await client.release(); // Libérer la connexion après utilisation
  }
}
