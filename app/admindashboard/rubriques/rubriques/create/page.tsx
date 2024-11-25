import RubriqueForm from "@/app/ADMIN/CRUD/ui/rubrique-form";
import { handleCreateRubriqueAction } from "@/app/ADMIN/CRUD/lib/actions";
import { rubriqueSchema } from "@/app/ADMIN/CRUD/lib/schemas";
import { z } from "zod";

export default function CreateRubriquePage() {
    const rubrique: z.infer<typeof rubriqueSchema> = {
        libelle: '',
        image: '',
        active: true,
        id_rubrique_1: undefined,
    };
    const submitFunction = handleCreateRubriqueAction.bind(null);
    return (
        <RubriqueForm rubrique={rubrique} btnName="Submit" submitFunction={submitFunction} title="Create a new rubrique." type="create"></RubriqueForm>
    );
};