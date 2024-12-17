import { DataTable } from "./data-table";
import { columns } from "./column";
import { db } from "@/drizzle/db";
import { company, industry } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function CompanyDashboard() {
  const data = await db
    .select({
      id: company.id,
      name: company.name,
      employeeNumber: company.employeeNumber,
      industryName: industry.name,
      country: company.country,
      slug: company.slug,
    })
    .from(company)
    .leftJoin(industry, eq(company.industryID, industry.id));

  const formattedData = data.map((item) => ({
    id: item.id,
    name: item.name,
    employeeNumber: item.employeeNumber,
    industryName: item.industryName || "Chưa xác định",
    country: item.country,
    slug: item.slug,
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý công ty</h1>
        <Button asChild>
          <Link href="/admin/companies/createCompany">
            Thêm công ty mới
            <PlusCircle className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Suspense>
        {formattedData.length > 0 ? (
          <DataTable columns={columns} data={formattedData} />
        ) : (
          <p>Không có dữ liệu công ty.</p>
        )}
      </Suspense>
    </div>
  );
}
