import { handleEditRubriqueAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchRubriqueById } from "@/app/ADMIN/CRUD/lib/data";
import RubriqueForm from "@/app/ADMIN/CRUD/ui/rubrique-form";

// Type pour gérer params comme une promesse
type Params = Promise<{ id: string }>;

export default async function EditRubriquePage({ params }: { params: Params }) {
    // Résolution de la promesse params
    const resolvedParams = await params;
    const id_rubrique = Number(resolvedParams.id);

    if (isNaN(id_rubrique)) {
        return (
            <div className="flex mt-4 text-center">
                ID de rubrique invalide : {resolvedParams.id}.
            </div>
        );
    }

    const rubrique = await fetchRubriqueById(id_rubrique);

    if (!rubrique) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de rubrique avec cet ID : {resolvedParams.id}.
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
