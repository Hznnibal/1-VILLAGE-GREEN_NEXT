import { handleEditFournisseurAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchFournisseurById } from "@/app/ADMIN/CRUD/lib/data";
import FournisseurForm from "@/app/ADMIN/CRUD/ui/supplier-form";

// Type pour gérer params comme une promesse
type Params = Promise<{ id: string }>;

export default async function EditFournisseurPage({ params }: { params: Params }) {
    // Résolution de la promesse params
    const resolvedParams = await params;
    const id_fournisseur = Number(resolvedParams.id);

    if (isNaN(id_fournisseur)) {
        return (
            <div className="flex mt-4 text-center">
                ID de fournisseur invalide : {resolvedParams.id}.
            </div>
        );
    }

    // Récupérer le fournisseur en utilisant l'ID converti
    const fournisseur = await fetchFournisseurById(id_fournisseur);

    if (!fournisseur) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de fournisseur avec cet ID : {resolvedParams.id}.
            </div>
        );
    }

    const submitFunction = handleEditFournisseurAction.bind(null, id_fournisseur);

    return (
        <FournisseurForm
            fournisseur={fournisseur}
            btnName="Modifier"
            submitFunction={submitFunction}
            type="update"
            title={`Editer le fournisseur ${fournisseur.nom}.`}
        />
    );
}
