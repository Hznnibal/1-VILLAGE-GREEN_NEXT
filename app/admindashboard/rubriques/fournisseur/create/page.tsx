import { handleCreateFournisseurAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fournisseurSchema } from "@/app/ADMIN/CRUD/lib/schemas";
import FournisseurForm from "@/app/ADMIN/CRUD/ui/supplier-form";
import { z } from "zod";

export default function CreateFournisseurPage() {
    const fournisseur: z.infer<typeof fournisseurSchema> = {
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
    };
    const submitFunction = handleCreateFournisseurAction.bind(null);
    return (
        <FournisseurForm fournisseur={fournisseur} btnName="Submit" submitFunction={submitFunction} title="Create a new product." type="create"></FournisseurForm>
    );
};