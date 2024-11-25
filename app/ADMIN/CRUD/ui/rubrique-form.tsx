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
import { rubriqueSchema } from "@/app/ADMIN/CRUD/lib/schemas"; // Assurez-vous que ce schéma existe
import Link from "next/link";

export default function RubriqueForm({
  rubrique,
  btnName,
  submitFunction,
  title,
  type,
}: {
  rubrique: z.infer<typeof rubriqueSchema>;
  btnName: string;
  submitFunction: any;
  title: string;
  type: string;
}) {
  const form = useForm<z.infer<typeof rubriqueSchema>>({
    resolver: zodResolver(rubriqueSchema),
    defaultValues: {
      libelle: rubrique.libelle,
      image: rubrique.image,
      active: rubrique.active,
      id_rubrique_1: rubrique.id_rubrique_1,
    },
  });

  async function handleSubmit(rubrique: z.infer<typeof rubriqueSchema>) {
    if (type === "create") {
      await submitFunction(rubrique);
    } else {
      await submitFunction(rubrique);
    }
  }

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="font-bold mb-6">{title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[450px]">
          <FormField
            control={form.control}
            name="libelle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Libelle</FormLabel>
                <FormControl>
                  <Input placeholder="Libellé de la rubrique" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="URL de l'image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Input placeholder="Status actif/inactif" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="id_rubrique_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rubrique parent</FormLabel>
                <FormControl>
                  <Input placeholder="ID rubrique parent" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-evenly gap-4">
            <div>
              <Link href={"/admindashboard/rubriques/rubriques"}>
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
  );
}
