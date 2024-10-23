import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg'; // Utilise pg pour te connecter à ta base de données

// Crée une connexion à PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL, // URL de la base de données venant des variables d'environnement
  ssl: {
    rejectUnauthorized: false, // nécessaire pour éviter les erreurs de certificat SSL
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { nom, prenom, email, password, adresse, code_postal, ville, téléphone } = req.body;

    try {
      // Ouvre une connexion à la base de données
      await client.connect();

      // Insertion du nouvel utilisateur dans la table "client"
      const query = `
        INSERT INTO client (nom, prenom, email, password, adresse, code_postal, ville, téléphone)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
      `;
      const values = [nom, prenom, email, password, adresse, code_postal, ville, téléphone];

      const result = await client.query(query, values);

      // Ferme la connexion
      await client.end();

      // Renvoie la réponse avec les informations de l'utilisateur créé
      res.status(201).json({ message: 'Utilisateur créé avec succès', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
