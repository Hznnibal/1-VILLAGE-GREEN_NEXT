import { getUser } from "@/app/lib/getuser";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-10-28.acacia",
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Utilisateur non authentifié" },
        { status: 401 }
      );
    }

    const user = await getUser(session.user.email);

    if (!user || !user.ref_client) {
      return NextResponse.json(
        { error: "Client introuvable dans la base de données" },
        { status: 404 }
      );
    }

    const ref_client = user.ref_client;

    const { cartItems } = await request.json();

    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.libelle,
        },
        unit_amount: Math.round(item.product.prix * 100),
      },
      quantity: item.count,
    }));

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/?success=true`,
      cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      metadata: {
        ref_client,
        nom: user.nom,
        adresse_livraison: user.adresse,
        cartItems: JSON.stringify(cartItems),
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err: any) {
    console.error("Erreur lors de la création de la session :", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
