import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function GET() {
  try {
    const customers = await stripe.customers.list({
      limit: 100,
    });

    const data = customers.data.map((customer) => ({
      date: new Date(customer.created * 1000),
      amount: 1,
      email: customer.email,
      nom: customer.name || "Unknown",
      date_inscription: new Date(customer.created * 1000),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des utilisateurs depuis Stripe :",
      error
    );
    return NextResponse.json(
      { error: "Impossible de récupérer les utilisateurs depuis Stripe" },
      { status: 500 }
    );
  }
}
