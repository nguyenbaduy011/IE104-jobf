import Link from "next/link";
import { Home, Users, Briefcase, Building } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Quản trị viên</h1>
      </div>
      <nav className="mt-8">
        <Link
          href="/admin"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Home className="mr-2" />
          Bảng điều khiển
        </Link>
        <Link
          href="/admin/companies"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Building className="mr-2" />
          Công ty
        </Link>
        <Link
          href="/admin/users"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Users className="mr-2" />
          Người dùng
        </Link>
        <Link
          href="/admin/jobs"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          <Briefcase className="mr-2" />
          Công việc
        </Link>
      </nav>
    </div>
  );
}
