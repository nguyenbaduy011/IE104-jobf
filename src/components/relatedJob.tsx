/* eslint-disable @next/next/no-img-element */
import { company, job } from "@/drizzle/schema/schema";
import { Banknote, MapPin, MonitorIcon as MonitorCog } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";

interface RelatedJobsProps {
  companyID: number;
}

export async function RelatedJobs({ companyID }: RelatedJobsProps) {
  const job_list = await db
    .select()
    .from(job)
    .where(eq(job.companyID, companyID));
  const thisCompany = await db.query.company.findFirst({
    where: eq(company.id, companyID),
  });
  return (
    <div className="rounded-lg border bg-white">
      <div className="py-5 px-4 space-y-3">
        <h2 className="text-xl font-semibold border-b-2">
          Các vị trí đang tuyển dụng
        </h2>

        <div>
          {job_list.length === 0 ? (
            <p className="text-gray-500">
              Hiện chưa có vị trí nào được tuyển dụng.
            </p>
          ) : (
            job_list.map((job) => (
              <Link href={`/jobs/${job.slug}?id=${job.id}`} key={job.id}>
                <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-white hover:bg-amber-50 transition-colors duration-200 shadow-sm">
                  <div className="text-xs text-gray-500 mb-2">
                    Đăng {getDaysAgo(job.createdAt)} ngày trước
                  </div>

                  <div className="flex items-center my-2">
                    <img
                      src={
                        thisCompany?.avatar || "https://via.placeholder.com/80"
                      }
                      alt={`${job} Logo`}
                      className="rounded-sm mr-3 w-[80px] h-[80px]"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {job.jobTitle || "Tên công việc chưa cập nhật"}
                      </h3>
                      <p className="font-medium text-gray-700">
                        {thisCompany?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 text-green-700 font-bold text-sm items-center">
                    <Banknote />
                    <span>{job.salary || "Lương chưa cập nhật"}</span>
                  </div>

                  <div className="border border-dashed"></div>
                  <div className="text-sm space-y-2">
                    <div className="flex gap-2 items-center">
                      <MapPin size={20} className="text-gray-400" />
                      <span>
                        {thisCompany?.address || "Địa điểm chưa cập nhật"}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <MonitorCog size={20} className="text-gray-400" />
                      <span>
                        {job.workingWay || "Hình thức làm việc chưa cập nhật"}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function getDaysAgo(date: Date): number {
  const now = new Date();
  const diffTime = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 ? diffDays : 0;
}
