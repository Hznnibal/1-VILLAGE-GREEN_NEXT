// utils/db.ts
import { Pool } from 'pg';
import { verifyPassword } from './password';

// Configuration de la base de données PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUserFromDb(email: string, plainPassword: string) {
  try {
    // Connexion à la base de données
    const client = await pool.connect();
    
    // Requête pour obtenir l'utilisateur par email
    const query = 'SELECT * FROM client WHERE email = $1';
    const result = await client.query(query, [email]);

    client.release();

    // Vérifier si l'utilisateur existe
    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    // Vérifier si le mot de passe fourni correspond au mot de passe haché
    const isPasswordValid = await verifyPassword(plainPassword, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Retourner l'utilisateur si le mot de passe est valide
    return user;
  } catch (err) {
    console.error('Erreur lors de la récupération de l’utilisateur dans la base de données', err);
    return null;
  }
}
