"use client";

import { Client } from "@/app/lib/definitions"; // Adjust this if you have specific types for your client data
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/ADMIN/CRUD/ui/table";

// Define the columns for your table
export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "nom",
        header: () => <div className="text-left font-semibold">Nom et Prénom</div>,
    },

    {
        accessorKey: "email",
        header: () => <div className="text-left font-semibold">Email</div>,
    },
    {
        accessorKey: "date_inscription",
        header: () => <div className="text-left font-semibold">Date d'inscription</div>,
    },
];

export async function fetchClients(): Promise<Client[]> {
    const response = await fetch("/api/stripe/users");
    if (!response.ok) {
        throw new Error("Failed to fetch clients from Stripe");
    }
    return response.json();
}

export default function ListCustomers() {
    const [clients, setClients] = useState<Client[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClients();
                setClients(data);
            } catch (error) {
                setError("Failed to load clients.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading clients...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={clients!} />
        </div>
    );
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
