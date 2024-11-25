import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.text();
    if (!body) {
      return NextResponse.json(
        { error: "Le corps de la requête est vide." },
        { status: 400 }
      );
    }

    const { name, email, message } = JSON.parse(body);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs (nom, email, message) sont requis." },
        { status: 400 }
      );
    }

    console.log(`Nom: ${name}, Email: ${email}, Message: ${message}`);

    return NextResponse.json({
      success: true,
      message: "Message envoyé avec succès.",
    });
  } catch (error) {
    console.error("Erreur dans l'API Contact:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors du traitement de votre requête." },
      { status: 500 }
    );
  }
}

/* A CONFIGURER */

/* 
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Lire et parser les données du formulaire
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, email, message) sont requis.' },
        { status: 400 }
      );
    }

    // Configurer le transport SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true', // true pour le port 465, false pour les autres
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Créer le contenu de l'email
    const mailOptions = {
      from: `"${name}" <${email}>`, // De qui provient le message
      to: process.env.CONTACT_EMAIL, // Adresse où le message sera envoyé
      subject: `Nouveau message de ${name}`, // Objet de l'email
      text: message, // Contenu en texte brut
      html: `<p><strong>Nom :</strong> ${name}</p>
             <p><strong>Email :</strong> ${email}</p>
             <p><strong>Message :</strong></p>
             <p>${message}</p>`, // Contenu en HTML
    };

    // Envoyer l'email
    await transporter.sendMail(mailOptions);

    // Retourner une réponse de succès
    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès.',
    });
  } catch (error) {
    console.error('Erreur dans l\'envoi d\'email :', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de l\'email.' },
      { status: 500 }
    );
  }
}
*/
