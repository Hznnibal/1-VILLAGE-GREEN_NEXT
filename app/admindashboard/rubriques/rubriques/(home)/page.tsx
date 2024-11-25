import { fetchRubriques } from "@/app/lib/data";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/app/ui/button";
import Link from "next/link";

export default async function Home() {
  const products = await fetchRubriques();
  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 text-center">
        <Link href={"/admindashboard/rubriques/rubriques/create"}>
          <Button>Créer une nouvelle rubrique</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products!} />
    </div>
  );
};