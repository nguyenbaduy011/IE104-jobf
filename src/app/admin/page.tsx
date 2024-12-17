import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema/auth";
import { company, job } from "@/drizzle/schema/schema";
import { count } from "drizzle-orm";
import { Building, Users, Briefcase } from "lucide-react";

export default async function AdminDashboard() {

  const companies = await db.select({ count: count() }).from(company);
  const companyCount = companies[0]?.count ?? 0

  const users = await db.select({ count: count() }).from(user);
  const userCount = users[0]?.count ?? 0;

  const jobs = await db.select({ count: count() }).from(job);
  const jobCount = jobs[0]?.count ?? 0;
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Bảng điều khiển</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số công ty
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số công việc</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
