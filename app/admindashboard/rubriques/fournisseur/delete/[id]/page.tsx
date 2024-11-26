import { Button } from "@/app/ADMIN/button";
import { handleDeleteFournisseurAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchFournisseurById } from "@/app/ADMIN/CRUD/lib/data";
import Link from "next/link";

// Type pour gérer params comme une promesse
type Params = Promise<{ id: string }>;

export default async function DeleteFournisseurPage({ params }: { params: Params }) {
    // Résolution de la promesse params
    const resolvedParams = await params;
    const fournisseurId = Number(resolvedParams.id);

    // Récupérer le fournisseur par son ID
    const fournisseur = await fetchFournisseurById(fournisseurId);
    const bindedHandleDeleteFournisseurAction = handleDeleteFournisseurAction.bind(null, fournisseurId);

    return (
        <div className="flex flex-col items-center mt-6 text-blue-50">
            <h1>
                Are you sure you want to delete the fournisseur{" "}
                <span className="font-bold">{fournisseur?.nom}</span>?
            </h1>
            <p className="mt-6 font-semibold">Here are the details:</p>
            <ul className="mt-6">
                <li>Nom: {fournisseur?.nom}</li>
                <li>Email: {fournisseur?.email}</li>
                <li>Téléphone: {fournisseur?.telephone}</li>
                {/* Afficher d'autres informations sur le fournisseur si nécessaire */}
            </ul>
            <div className="flex items-center justify-evenly gap-4 mt-6">
                <div>
                    <Link href={"/admindashboard/rubriques/fournisseur"}>
                        <Button>Cancel</Button>
                    </Link>
                </div>
                <div>
                    <form action={bindedHandleDeleteFournisseurAction}>
                        <Button type="submit">Delete</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
