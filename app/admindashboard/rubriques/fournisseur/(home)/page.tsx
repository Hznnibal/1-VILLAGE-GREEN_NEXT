import { fetchFournisseur } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/app/ui/button"
import Link from "next/link";

export default async function Home() {
  const suppliers = await fetchFournisseur();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 text-center">
        <Link href={"/admindashboard/rubriques/fournisseur/create"}>
          <Button>Ajoutez un fournisseur</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={suppliers!} />
    </div>
  );
};