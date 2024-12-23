/* eslint-disable @next/next/no-img-element */
import { company, job } from "@/drizzle/schema/schema";
import { Banknote, MapPin, MonitorIcon as MonitorCog } from "lucide-react";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import Image from "next/image";

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
        <div className="flex items-center justify-between border-b pb-3">
          <h2 className="text-xl font-semibold">Các vị trí đang tuyển dụng</h2>
          {job_list.length > 0 && (
            <span className="text-sm text-gray-500">
              {job_list.length} vị trí
            </span>
          )}
        </div>

        <div className="space-y-4">
          {job_list.length === 0 ? (
            <div>
              <p className="text-gray-500">
                Hiện chưa có vị trí nào được tuyển dụng.
              </p>
            </div>
          ) : (
            job_list.map((job) => (
              <Link
                href={`/jobs/${job.slug}?id=${job.id}`}
                key={job.id}
                className="block group"
              >
                <div
                  className="space-y-3 border border-gray-200 rounded-lg p-4 bg-white 
                    hover:bg-amber-50/80 hover:border-amber-200 transition-all duration-300 
                    shadow-sm hover:shadow-md"
                >
                  <div className="text-xs text-gray-500 mb-2">
                    Đăng {getDaysAgo(job.createdAt)} ngày trước
                  </div>

                  <div className="flex items-center gap-4 my-2">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={
                          thisCompany?.avatar ||
                          "https://via.placeholder.com/80"
                        }
                        alt={`${job} Logo`}
                        className="rounded-none object-cover group-hover:scale-105 transition-transform duration-200"
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-gray-800 truncate">
                        {job.jobTitle || "Tên công việc chưa cập nhật"}
                      </h3>
                      <p className="font-medium text-gray-700 truncate">
                        {thisCompany?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 text-green-700 font-bold text-sm items-center">
                    <Banknote className="w-4 h-4" />
                    <span>{job.salary || "Lương chưa cập nhật"}</span>
                  </div>

                  <div className="border-t border-dashed border-gray-200 my-3"></div>
                  <div className="text-sm space-y-2.5">
                    <div className="flex gap-2 items-center text-gray-600">
                      <MapPin
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="truncate">
                        {thisCompany?.address || "Địa điểm chưa cập nhật"}
                      </span>
                    </div>
                    <div className="flex gap-2 items-center text-gray-600">
                      <MonitorCog
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="truncate">
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
