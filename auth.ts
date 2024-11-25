import type { Client } from "@/app/lib/definitions";
import { stripe } from "@/app/lib/stripe";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<Client | undefined> {
  try {
    const user = await sql<Client>`SELECT * FROM client WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      const email = message.user.email;

      if (!email) {
        return;
      }

      // Crée un nouveau client Stripe
      const stripeCustomer = await stripe.customers.create({
        email,
        name: `${message.user.name}`,
      });

      // Met à jour la base de données avec l'ID Stripe
      await sql`
        UPDATE client
        SET stripe_customer_id = ${stripeCustomer.id}
        WHERE ref_client = ${message.user.id};
      `;
    },
  },
});
