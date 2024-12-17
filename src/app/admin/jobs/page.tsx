import { DataTable } from "./data-table";
import { columns } from "./column";
import { db } from "@/drizzle/db";
import { company, job } from "@/drizzle/schema/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import Link from "next/link";

export default async function JobDashboard() {
  const data = await db
    .select({
      id: job.id,
      jobTitle: job.jobTitle,
      companyName: company.name,
      createdAt: job.createdAt,
      slug: job.slug,
    })
    .from(job)
    .leftJoin(company, eq(job.companyID, company.id));

  const formattedData = data.map((item) => ({
    id: item.id,
    jobTitle: item.jobTitle,
    companyName: item.companyName || "Chưa xác định",
    createdAt: item?.createdAt ? item?.createdAt.toLocaleDateString() : "N/A",
    slug: item.slug,
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý công việc</h1>
        <Button asChild>
          <Link href="/admin/jobs/createJob">
            Thêm công việc mới
            <PlusCircle className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Suspense>
        {formattedData.length > 0 ? (
          <DataTable columns={columns} data={formattedData} />
        ) : (
          <p>Không có dữ liệu công việc.</p>
        )}
      </Suspense>
    </div>
  );
}
