"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/app/ADMIN/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/ADMIN/CRUD/ui/form"
import { Input } from "@/app/ADMIN/CRUD/ui/input"
import { productSchema } from "@/app/ADMIN/CRUD/lib/schemas"
import Link from "next/link"

export default function ProductForm({
    product, btnName, submitFunction, title, type
}: {
    product: z.infer<typeof productSchema>, btnName: string, submitFunction: any, title: string, type: string
}) {
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            libelle: product.libelle,
            description: product.description,
            prix: product.prix,
            active: product.active,
            id_fournisseur: product.id_fournisseur,
            id_rubrique: product.id_rubrique,
            photo: product.photo,
        }
    });
    async function handleSubmit(product: z.infer<typeof productSchema>) {
        if (type === "create") {
            await submitFunction(product);
        } else {
            await submitFunction(product);
        }
    };
    return (
        <div className="flex flex-col items-center mt-6">
            <h1 className="font-bold mb-6">{title}</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[450px]">
                    <FormField // libelle
                        control={form.control}
                        name="libelle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField // description
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product description" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField // prix
                        control={form.control}
                        name="prix"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prix</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField // idfournisseur
                        control={form.control}
                        name="id_fournisseur"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fournisseur</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product stock" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField // idrubrique
                        control={form.control}
                        name="id_rubrique"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rubrique</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product stock" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField // photo
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter product stock" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-evenly gap-4">
                        <div>
                            <Link href={"/admindashboard/rubriques/produits"}>
                                <Button>Cancel</Button>
                            </Link>
                        </div>
                        <div>
                            <Button type="submit">{btnName}</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
};