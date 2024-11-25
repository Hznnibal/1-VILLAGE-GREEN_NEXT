import RubriqueForm from "@/app/ADMIN/CRUD/ui/rubrique-form";
import { handleEditRubriqueAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchRubriqueById } from "@/app/ADMIN/CRUD/lib/data";

export default async function EditRubriquePage({ params }: { params: { id: string } }) {
    const id_rubrique = Number(params?.id);
    if (isNaN(id_rubrique)) {
        return (
            <div className="flex mt-4 text-center">
                ID de rubrique invalide : {params?.id}.
            </div>
        );
    }

    const rubrique = await fetchRubriqueById(id_rubrique);

    if (!rubrique) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de rubrique avec cet ID : {params.id}.
            </div>
        );
    }

    // Convertir les valeurs `null` en `undefined` pour id_rubrique_1
    const rubriqueData = {
        ...rubrique,
        id_rubrique_1: rubrique.id_rubrique_1 ?? undefined,
    };

    const submitFunction = handleEditRubriqueAction.bind(null, id_rubrique);

    return (
        <RubriqueForm
            rubrique={rubriqueData} // Utiliser rubriqueData avec id_rubrique_1 en `undefined` si `null`
            btnName="Modifier"
            submitFunction={submitFunction}
            type="update"
            title={`Editer la rubrique ${rubrique.libelle}.`}
        />
    );
}
