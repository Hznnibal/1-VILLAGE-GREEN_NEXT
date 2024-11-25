import { UserIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export function AdminButton() {
    return (
        <Link href="/admindashboard" className="flex items-center gap-2 p-2 text-sm font-medium text-gray-700 hover:text-blue-600">
            <UserIcon className="w-6" />
            <span className="hidden md:block">Administration</span>
        </Link>
    )
}