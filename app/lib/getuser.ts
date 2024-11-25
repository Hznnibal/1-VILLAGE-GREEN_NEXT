import type { Client } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";

export async function getUser(email: string): Promise<Client | undefined> {
  try {
    const result =
      await sql<Client>`SELECT * FROM client WHERE email = ${email}`;
    return result.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
