import { Client, Commande } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(request: Request) {
  const payload = await request.text();
  const sig = request.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err: any) {
    console.error("Erreur de validation du webhook :", err.message);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const ref_client = parseInt(session.metadata?.ref_client || "0", 10);
    const nom = session.metadata?.nom || "Commande sans nom";
    const total = parseInt(session.amount_total?.toString() || "0", 10);
    const adresse_livraison =
      session.metadata?.adresse_livraison || "Adresse inconnue";

    try {
      const resultCommande = await sql<Commande>`
        INSERT INTO Commande (nom, total, etat, date_commande, adresse_livraison, ref_client)
        VALUES (${nom}, ${
        total / 100
      }, 'En cours', 'NOW()', ${adresse_livraison}, ${ref_client})
        RETURNING id_commande;
      `;

      const id_commande = resultCommande.rows[0]?.id_commande;

      if (!id_commande) {
        throw new Error("Échec de l'insertion de la commande.");
      }

      console.log("Commande persistée avec succès :", id_commande);

      const clientResult = await sql<Client>`
        SELECT nom, adresse FROM client WHERE ref_client = ${ref_client};
      `;

      if (clientResult.rows.length === 0) {
        console.error("Client non trouvé pour ref_client:", ref_client);
        return NextResponse.json(
          { error: "Client non trouvé" },
          { status: 400 }
        );
      }

      const client = clientResult.rows[0];
      console.log("Informations du client:", client);
    } catch (error) {
      console.error("Erreur lors de la persistance de la commande :", error);
      return NextResponse.json(
        { error: "Erreur lors de la persistance de la commande" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
