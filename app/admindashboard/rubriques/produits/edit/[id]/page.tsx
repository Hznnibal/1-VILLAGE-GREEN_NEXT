import { handleEditProductAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchProduitById } from "@/app/ADMIN/CRUD/lib/data";
import ProductForm from "@/app/ADMIN/CRUD/ui/product-form";

// Type pour gérer params comme une promesse
type Params = Promise<{ id: string }>;

export default async function EditProductPage({ params }: { params: Params }) {
    // Résolution de la promesse params
    const resolvedParams = await params;
    const id_produit = Number(resolvedParams.id);

    if (isNaN(id_produit)) {
        return (
            <div className="flex mt-4 text-center">
                ID de produit invalide : {resolvedParams.id}.
            </div>
        );
    }

    // Récupérer le produit en utilisant l'ID converti
    const product = await fetchProduitById(id_produit);

    if (!product) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de produit avec cet ID : {resolvedParams.id}.
            </div>
        );
    }

    const submitFunction = handleEditProductAction.bind(null, id_produit);

    return (
        <ProductForm
            product={product}
            btnName="Modifier"
            submitFunction={submitFunction}
            type="update"
            title={`Editer le produit ${product.libelle}.`}
        />
    );
}
