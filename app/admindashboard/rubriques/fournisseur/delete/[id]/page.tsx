import { Button } from "@/app/ADMIN/button";
import { handleDeleteFournisseurAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchFournisseurById } from "@/app/ADMIN/CRUD/lib/data";
import Link from "next/link";

export default async function DeleteFournisseurPage({ params }: { params: { id: string } }) {
    const fournisseur = await fetchFournisseurById(Number(params.id)); // Récupérer le fournisseur par son ID
    const bindedHandleDeleteFournisseurAction = handleDeleteFournisseurAction.bind(null, Number(params.id));

    return (
        <div className="flex flex-col items-center mt-6 text-blue-50">
            <h1>Are you sure you want to delete the fournisseur <span className="font-bold">{fournisseur?.nom}</span>?</h1>
            <p className="mt-6 font-semibold">Here are the details:</p>
            <ul className="mt-6">
                <li>Nom: {fournisseur?.nom}</li>
                <li>Email: {fournisseur?.email}</li>
                <li>Téléphone: {fournisseur?.telephone}</li>
                {/* Afficher d'autres informations sur le fournisseur si nécessaire */}
            </ul>
            <div className="flex items-center justify-evenly gap-4 mt-6">
                <div>
                    <Link href={"/admindashboard/rubriques/fournisseurs"}>
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
};
