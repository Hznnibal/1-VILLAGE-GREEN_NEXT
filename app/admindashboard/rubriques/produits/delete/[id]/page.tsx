import { Button } from "@/app/ADMIN/button";
import { handleDeleteProductAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchProduitById } from "@/app/ADMIN/CRUD/lib/data";
import Link from "next/link";

export default async function DeleteProductPage({ params }: { params: { id: string } }) {
    const product = await fetchProduitById(Number(params.id));
    const bindedHandleDeleteProductAction = handleDeleteProductAction.bind(null, Number(params.id));
    return (
        <div className="flex flex-col items-center mt-6 text-blue-50">
            <h1>Êtes-vous sûr de vouloir supprimer ce produit <span className="font-bold">{product?.libelle}</span>?</h1>
            <p className="mt-6 font-semibold">Voici les détails:</p>
            <ul className="mt-6">
                <li>Nom: {product?.libelle}</li>
                <li>Prix: {product?.prix} Rs.</li>
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
};