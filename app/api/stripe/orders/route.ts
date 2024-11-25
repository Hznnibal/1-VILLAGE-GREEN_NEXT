import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function GET() {
  try {
    const charges = await stripe.charges.list({
      limit: 10,
    });

    const data = charges.data.map((charge) => ({
      date_commande: new Date(charge.created * 1000), // Convert timestamp to date
      total: charge.amount / 100, // Amount in Stripe is in cents, convert to main currency unit
      nom: charge.billing_details.name || "Unknown", // Get customer name
      email: charge.billing_details.email || "No email provided",
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commandes Stripe :",
      error
    );
    return NextResponse.json(
      { error: "Impossible de récupérer les commandes depuis Stripe" },
      { status: 500 }
    );
  }
}
