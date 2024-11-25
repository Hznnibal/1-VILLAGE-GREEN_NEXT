import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function GET() {
  try {
    const charges = await stripe.charges.list({ limit: 100 });
    const data = charges.data.map((charge) => ({
      amount: charge.amount / 100, // Convertir en euros
      date: new Date(charge.created * 1000), // Convertir le timestamp
      status: charge.status,
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des charges :", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les données Stripe" },
      { status: 500 }
    );
  }
}
