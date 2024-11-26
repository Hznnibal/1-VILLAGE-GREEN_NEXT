import { Button } from "@/app/ADMIN/button";
import { handleDeleteProductAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchProduitById } from "@/app/ADMIN/CRUD/lib/data";
import Link from "next/link";

// Type pour gérer params comme une promesse
type Params = Promise<{ id: string }>;

export default async function DeleteProductPage({ params }: { params: Params }) {
    // Résolution de la promesse params
    const resolvedParams = await params;
    const productId = Number(resolvedParams.id);

    // Récupérer le produit par son ID
    const product = await fetchProduitById(productId);
    const bindedHandleDeleteProductAction = handleDeleteProductAction.bind(null, productId);

    return (
        <div className="flex flex-col items-center mt-6 text-blue-50">
            <h1>
                Êtes-vous sûr de vouloir supprimer ce produit{" "}
                <span className="font-bold">{product?.libelle}</span> ?
            </h1>
            <p className="mt-6 font-semibold">Voici les détails :</p>
            <ul className="mt-6">
                <li>Nom : {product?.libelle}</li>
                <li>Prix : {product?.prix} Rs.</li>
            </ul>
            <div className="flex items-center justify-evenly gap-4 mt-6">
                <div>
                    <Link href={"/admindashboard/rubriques/produits"}>
                        <Button>Annuler</Button>
                    </Link>
                </div>
                <div>
                    <form action={bindedHandleDeleteProductAction}>
                        <Button type="submit">Supprimer</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
