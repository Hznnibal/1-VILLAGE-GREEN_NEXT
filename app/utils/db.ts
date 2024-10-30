// utils/db.ts
import { db } from '@vercel/postgres'; // Assurez-vous que le bon chemin est utilisé
import { verifyPassword } from './password';

export async function getUserFromDb(email: string, plainPassword: string) {
  const client = await db.connect(); // Connexion à la base de données

  try {
    // Requête pour obtenir l'utilisateur par email
    const result = await client.sql`
      SELECT * FROM client WHERE email = ${email};
    `;

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
  } finally {
    await client.release(); // Libérer la connexion après utilisation
  }
}
