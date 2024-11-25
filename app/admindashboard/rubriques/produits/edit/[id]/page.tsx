import ProductForm from "@/app/ADMIN/CRUD/ui/product-form";
import { handleEditProductAction } from "@/app/ADMIN/CRUD/lib/actions";
import { fetchProduitById } from "@/app/ADMIN/CRUD/lib/data";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    // Utilisation de Number pour convertir params.id en entier si possible
    const id_produit = Number(params?.id);
    if (isNaN(id_produit)) {
        return (
            <div className="flex mt-4 text-center">
                ID de produit invalide : {params?.id}.
            </div>
        );
    }

    // Récupérer le produit en utilisant l'ID converti
    const product = await fetchProduitById(id_produit);

    if (!product) {
        return (
            <div className="flex mt-4 text-center">
                Il n'y a pas de produit avec cet ID : {params.id}.
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
