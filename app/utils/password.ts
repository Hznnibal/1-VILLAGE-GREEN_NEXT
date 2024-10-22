import bcrypt from 'bcrypt';

// Nombre de "rounds" pour générer le sel. Plus le chiffre est élevé, plus c'est sécurisé, mais cela peut ralentir les performances.
const SALT_ROUNDS = 10;

/**
 * Hacher un mot de passe avec un "salt"
 * @param password - Mot de passe en texte clair
 * @returns Le mot de passe salé et haché
 */
export async function saltAndHashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(SALT_ROUNDS); // Génère un sel unique
  const hash = await bcrypt.hash(password, salt); // Hache le mot de passe avec le sel
  return hash; // Renvoie le mot de passe salé et haché
}

/**
 * Vérifier un mot de passe par rapport à son hash stocké
 * @param password - Mot de passe en texte clair
 * @param hash - Hash stocké en base de données
 * @returns Un booléen indiquant si le mot de passe est correct
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash); // Compare le mot de passe avec le hash stocké
}
