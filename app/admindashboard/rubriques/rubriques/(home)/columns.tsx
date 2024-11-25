"use client"

import { Button } from "@/app/ADMIN/button"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Rubrique } from "@/app/lib/definitions"

export const columns: ColumnDef<Rubrique>[] = [
    {
        accessorKey: "id_rubrique",
        header: () => <div className="text-left font-semibold">N° ID</div>,
    },
    {
        accessorKey: "libelle",
        header: () => <div className="text-left font-semibold">Nom de la rubrique</div>,
    },
    {
        accessorKey: "image",
        header: () => <div className="text-left font-semibold">Image</div>,
    },
    {
        accessorKey: "id_rubrique_1",
        header: () => <div className="text-left font-semibold">Rubrique mére</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-left font-semibold">Actions</div>,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex gap-2">
                    <Link href={`/admindashboard/rubriques/rubriques/edit/${product.id_rubrique}`}>
                        <Button>Editer</Button>
                    </Link>
                    <Link href={`/admindashboard/rubriques/rubriques/delete/${product.id_rubrique}`}>
                        <Button>Supprimer</Button>
                    </Link>
                </div>
            );
        }
    }
];