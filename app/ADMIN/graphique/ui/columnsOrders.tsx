"use client";

import { Commande } from "@/app/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Commande>[] = [
  {
    accessorKey: "date_commande",
    header: () => (
      <div className="text-left font-semibold">Date de commande</div>
    ),
    cell: (info) => info.getValue<Date>(), // Format the date
  },
  {
    accessorKey: "total",
    header: () => <div className="text-left font-semibold">Total (€)</div>,
    cell: (info) => info.getValue<number>().toFixed(2), // Display as currency
  },
  {
    accessorKey: "nom",
    header: () => <div className="text-left font-semibold">Nom</div>,
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left font-semibold">Email</div>,
  },
];

export async function fetchOrders(): Promise<Commande[]> {
  const response = await fetch("/api/stripe/orders"); // Endpoint de l'API
  if (!response.ok) {
    throw new Error("Échec de la récupération des commandes Stripe");
  }
  return response.json();
}
