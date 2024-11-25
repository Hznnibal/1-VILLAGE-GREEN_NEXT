import { Button } from "@/app/ADMIN/button";
import { handleDeleteRubriqueAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchRubriqueById } from "@/app/ADMIN/CRUD/lib/data";
import Link from "next/link";

export default async function DeleteRubriquePage({ params }: { params: { id: string } }) {
    const rubrique = await fetchRubriqueById(Number(params.id)); // Récupérer la rubrique par son ID
    const bindedHandleDeleteRubriqueAction = handleDeleteRubriqueAction.bind(null, Number(params.id));

    return (
        <div className="flex flex-col items-center mt-6 text-blue-50">
            <h1>Etes vous sur de vouloir supprimer cette rubrique<span className="font-bold">{rubrique?.libelle}</span>?</h1>
            <p className="mt-6 font-semibold">Voici les details:</p>
            <ul className="mt-6">
                <li>Libellé: {rubrique?.libelle}</li>
                {/* Afficher d'autres informations sur la rubrique si nécessaire */}
            </ul>
            <div className="flex items-center justify-evenly gap-4 mt-6">
                <div>
                    <Link href={"/admindashboard/rubriques/rubriques"}>
                        <Button>Annuler</Button>
                    </Link>
                </div>
                <div>
                    <form action={bindedHandleDeleteRubriqueAction}>
                        <Button type="submit">Supprimer</Button>
                    </form>
                </div>
            </div>
        </div>
    );
};
