import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { Client } from "@/app/lib/definitions";
import bcrypt from 'bcrypt';
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
          console.log('Invalid credentials');
          return null;
      },
    }),
  ],
});
