"use client"

import { Button } from "@/app/ADMIN/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Fournisseur } from "@/app/lib/definitions"

export const columns: ColumnDef<Fournisseur>[] = [
    {
        accessorKey: "nom",
        header: () => <div className="text-left font-semibold">Nom</div>,
    },
    {
        accessorKey: "email",
        header: () => <div className="text-left font-semibold">Email</div>,
    },
    {
        accessorKey: "telephone",
        header: () => <div className="text-left font-semibold">Téléphone</div>,
    },
    {
        accessorKey: "adresse",
        header: () => <div className="text-left font-semibold">Adresse</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-left font-semibold">Actions</div>,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex gap-2">
                    <Link href={`/admindashboard/rubriques/fournisseur/edit/${product.id_fournisseur}`}>
                        <Button>Editer</Button>
                    </Link>
                    <Link href={`/admindashboard/rubriques/fournisseur/delete/${product.id_fournisseur}`}>
                        <Button>Supprimer</Button>
                    </Link>
                </div>
            );
        }
    }
];