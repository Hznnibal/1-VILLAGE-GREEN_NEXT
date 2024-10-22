import { Pool } from 'pg';

// Crée une nouvelle instance de Pool pour se connecter à PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Assure-toi que DATABASE_URL est configurée dans ton fichier .env
  ssl: {
    rejectUnauthorized: false, // Désactive la vérification SSL stricte pour des environnements comme Vercel
  },
});

// Fonction pour exécuter des requêtes SQL sur la base de données
export async function query(text: string, params?: any[]) {
  try {
    // Exécute la requête SQL et renvoie les résultats
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('Erreur lors de l’exécution de la requête:', err);
    throw new Error('Erreur lors de la connexion à la base de données.');
  }
}

// Fonction pour récupérer un utilisateur depuis la base de données par email et mot de passe haché
export async function getUserFromDb(email: string, pwHash: string) {
  try {
    // Exécute une requête pour sélectionner l'utilisateur correspondant à l'email et au mot de passe haché
    const result = await query(
      'SELECT * FROM client WHERE email = $1 AND pwHash = $2',
      [email,pwHash]
    );

    // Si aucun utilisateur n'est trouvé, renvoie null
    if (result.rows.length === 0) {
      return null;
    }

    // Si un utilisateur est trouvé, renvoie les informations de cet utilisateur
    const user = result.rows[0];
    return {
      id: user.ref_client,
      name: user.nom,
      email: user.email,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur:', error);
    throw new Error('Erreur lors de la récupération de l’utilisateur.');
  }
}

// Exécuter cette fonction pour fermer toutes les connexions à la base de données lors de l’arrêt de l'application
export async function closePool() {
  await pool.end();
}
