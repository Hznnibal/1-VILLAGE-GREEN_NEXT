"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/ADMIN/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ADMIN/CRUD/ui/form";
import { Input } from "@/app/ADMIN/CRUD/ui/input";
import { fournisseurSchema } from "@/app/ADMIN/CRUD/lib/schemas"; // Assurez-vous que ce schéma existe
import Link from "next/link";

export default function FournisseurForm({
  fournisseur,
  btnName,
  submitFunction,
  title,
  type,
}: {
  fournisseur: z.infer<typeof fournisseurSchema>;
  btnName: string;
  submitFunction: any;
  title: string;
  type: string;
}) {
  const form = useForm<z.infer<typeof fournisseurSchema>>({
    resolver: zodResolver(fournisseurSchema),
    defaultValues: {
      nom: fournisseur.nom,
      email: fournisseur.email,
      telephone: fournisseur.telephone,
      adresse: fournisseur.adresse,
    },
  });

  async function handleSubmit(fournisseur: z.infer<typeof fournisseurSchema>) {
    if (type === "create") {
      await submitFunction(fournisseur);
    } else {
      await submitFunction(fournisseur);
    }
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="font-bold mb-6">{title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[450px]">
          <FormField
            control={form.control}
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du fournisseur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email du fournisseur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Adresse du fournisseur" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-evenly gap-4">
            <div>
              <Link href={"/admindashboard/rubriques/fournisseurs"}>
                <Button>Annuler</Button>
              </Link>
            </div>
            <div>
              <Button type="submit">{btnName}</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
