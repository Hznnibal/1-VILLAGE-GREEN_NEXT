import ProductForm from "@/app/ADMIN/CRUD/ui/product-form";
import { handleCreateProductAction } from "@/app/ADMIN/CRUD/lib/actions";
import { productSchema } from "@/app/ADMIN/CRUD/lib/schemas";
import { z } from "zod";

export default function CreateProductPage() {
    const product: z.infer<typeof productSchema> = {
        // id_produit: 0,
        description: '',
        photo: '',
        active: true,
        libelle: '',
        prix: 0,
        id_fournisseur: 0,
        id_rubrique: 0,

    };

    const submitFunction = handleCreateProductAction.bind(null);
    return (
        <ProductForm product={product} btnName="Submit" submitFunction={submitFunction} title="Create a new product." type="create"></ProductForm>
    );
};