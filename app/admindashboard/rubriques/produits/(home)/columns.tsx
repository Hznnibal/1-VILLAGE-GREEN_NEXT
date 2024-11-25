"use client";

import { Button } from "@/app/ADMIN/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Produit } from "@/app/lib/definitions"; // Import du type Produit

export const columns: ColumnDef<Produit>[] = [
    {
        accessorKey: "id_produit",
        header: () => <div className="text-left font-semibold">N° d'ID</div>,
    },
    {
        accessorKey: "libelle", // Modification pour correspondre à la propriété `libelle`
        header: () => <div className="text-left font-semibold">Nom</div>,
    },
    {
        accessorKey: "description",
        header: () => <div className="text-left font-semibold">Description</div>,
    },
    {
        accessorKey: "prix", // Modification pour correspondre à la propriété `prix`
        header: () => <div className="text-left font-semibold">Prix</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-left font-semibold">Actions</div>,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex gap-2">
                    <Link href={`/admindashboard/rubriques/produits/edit/${product.id_produit}`}>
                        <Button>Editer</Button>
                    </Link>
                    <Link href={`/admindashboard/rubriques/produits/delete/${product.id_produit}`}>
                        <Button>Supprimer</Button>
                    </Link>
                </div>
            );
        }
    }
];
