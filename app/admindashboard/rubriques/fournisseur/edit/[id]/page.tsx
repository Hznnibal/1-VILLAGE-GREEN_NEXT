import FournisseurForm from "@/app/ADMIN/CRUD/ui/supplier-form";
import { handleEditFournisseurAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchFournisseurById } from "@/app/ADMIN/CRUD/lib/data";

export default async function EditFournisseurPage({ params }: { params: { id: string } }) {
    const id_fournisseur = Number(params?.id);
    if (isNaN(id_fournisseur)) {
        return (
            <div className="flex mt-4 text-center">
                ID de fournisseur invalide : {params?.id}.
            </div>
        );
    }

    const fournisseur = await fetchFournisseurById(id_fournisseur);

    if (!fournisseur) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de fournisseur avec cet ID : {params.id}.
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
