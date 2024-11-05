import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe'; // Assurez-vous du chemin correct vers l'instance Stripe

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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
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
        password TEXT NOT NULL,
        stripe_customer_id TEXT
      );
    `;

    // Insertion de l'utilisateur
    const insertedUser = await client.sql`
      INSERT INTO client (nom, prenom, adresse, code_postal, ville, téléphone, email, commercial_rattache, password)
      VALUES (${nom}, ${prenom}, ${adresse}, ${code_postal}, ${ville}, ${téléphone}, ${email}, '****', ${hashedPassword})
      RETURNING ref_client;
    `;

    const refClient = insertedUser.rows[0]?.ref_client;
    if (!refClient) throw new Error("L'utilisateur n'a pas été inséré correctement.");

    // Création d'un client Stripe
    const stripeCustomer = await stripe.customers.create({
      email,
      name: `${prenom} ${nom}`,
    });

    // Mise à jour de la table `client` avec l'ID Stripe
    await client.sql`
      UPDATE client
      SET stripe_customer_id = ${stripeCustomer.id}
      WHERE ref_client = ${refClient};
    `;

    return NextResponse.json({ message: 'Utilisateur créé et ajouté à Stripe avec succès.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Une erreur est survenue.' }, { status: 500 });
  } finally {
    await client.release();
  }
}
