import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db'; // Assure-toi que le chemin est correct

export async function POST(request: Request) {
    const body = await request.json();
    
    const { nom, prenom, adresse, code_postal, ville, téléphone, email, password } = body;

    try {
        // Assurez-vous de hacher le mot de passe ici avant de l'insérer dans la base de données
        // Exemple d'utilisation de bcrypt pour hacher le mot de passe
        // const hashedPassword = await bcrypt.hash(password, 10);

        const client = await pool.connect(); // Se connecter au pool

        // Exécution de la requête pour insérer le client
        const result = await client.query(`
            INSERT INTO client (nom, prenom, adresse, code_postal, ville, téléphone, email, password)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `, [nom, prenom, adresse, code_postal, ville, téléphone, email, password]); // Utilise hashedPassword ici

        client.release(); // Libère le client

        return NextResponse.json({ message: 'Client créé avec succès', client: result.rows[0] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erreur lors de la création du client' }, { status: 500 });
    }
}
