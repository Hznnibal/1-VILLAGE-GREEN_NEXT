import { fetchProduits } from "@/app/lib/data";
import { columns } from "./columns";
import { Button } from "@/app/ui/button"
import Link from "next/link";
import { DataTable } from "./data-table";

export default async function Home() {
  const products = await fetchProduits();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 text-center">
        <Link href={"/admindashboard/rubriques/produits/create"}>
          <Button>Créer un nouveau produit</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products!} />
    </div>
  );
};