import { DataTable } from "./data-table";
import { columns } from "./column";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema/auth";
import { Suspense } from "react";

export default async function UserDashboard() {
  const data = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    })
    .from(user);

    const formattedData = data.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      role: item.role,
      createdAt: item?.createdAt ? item?.createdAt.toLocaleDateString() : "N/A",
    }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
      </div>
      <Suspense>
        {formattedData.length > 0 ? (
          <DataTable columns={columns} data={formattedData} />
        ) : (
          <p>Không có dữ liệu người dùng.</p>
        )}
      </Suspense>
    </div>
  );
}
