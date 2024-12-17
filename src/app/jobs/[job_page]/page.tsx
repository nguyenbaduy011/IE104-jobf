import { RelatedJobs } from "@/components/relatedJob";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { company, job } from "@/drizzle/schema/schema";
import { count, eq } from "drizzle-orm";
import {
  Banknote,
  CalendarDays,
  Heart,
  MapPin,
  MonitorCog,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface jobProps {
  searchParams: {
    id: string;
  };
}

export default async function JobPage({ searchParams }: jobProps) {
  const jobPageID = parseInt(searchParams.id, 10);
  if (isNaN(jobPageID)) {
    console.error("Invalid job ID:", searchParams.id);
    redirect("/");
  }

  let job_page;
  try {
    job_page = await db.query.job.findFirst({
      where: eq(job.id, jobPageID),
    });
  } catch (error) {
    console.error("Error fetching job page:", error);
    redirect("/");
  }

  //Lấy công ty sở hữu việc làm
  let job_company;
  if (job_page?.companyID) {
    try {
      job_company = await db.query.company.findFirst({
        where: eq(company.id, job_page.companyID),
      });
    } catch (error) {
      console.error("Error fetching company:", error);
      redirect("/");
    }
  }

  const formattedDate = job_page?.createdAt
    ? new Date(job_page.createdAt).toLocaleDateString("vi-VN")
    : "N/A";

  const related_jobs = job_page
    ? await db
        .select({ count: count() })
        .from(job)
        .where(eq(job.id, job_page.id))
    : [];
  const relatedJobCount = related_jobs[0]?.count ?? 0;

  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="py-2 grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="col-span-2 space-y-4">
          <div className="rounded-lg border bg-white px-4 py-6">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold">{job_page?.jobTitle}</div>
              <div className="text-gray-800 text-base">Tên công ty</div>
              <div className="flex gap-2 text-green-700 font-bold text-lg items-center">
                <Banknote />
                <div>{job_page?.salary}</div>
              </div>
              <div className="w-full flex items-center my-4 gap-3">
                <Button className="w-full font-bold">
                  <Send />
                  Ứng tuyển
                </Button>
                <Heart size={36} />
              </div>
              <div className="space-y-3 text-gray-600 text-sm">
                {/* Địa điểm làm việc */}
                <div className="flex gap-2 items-center">
                  <MapPin size={20} className="text-gray-400" />
                  <div>Địa điểm: {job_company?.address}</div>
                </div>
                {/* Hình thức làm việc */}
                <div className="flex gap-2 items-center">
                  <MonitorCog size={20} className="text-gray-400" />
                  <div>Hình thức làm việc: {job_page?.workingWay}</div>
                </div>
                {/* Ngày đăng */}
                <div className="flex gap-2 items-center">
                  <CalendarDays size={20} className="text-gray-400" />
                  <div>Ngày đăng: {formattedDate}</div>
                </div>
                {/* Kỹ năng yêu cầu */}
                <div className="flex gap-2 items-center">
                  <div>Kỹ năng: </div>
                  <div>{job_page?.requiredSkills}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white px-4 py-6 space-y-6">
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Mô tả công việc</div>
              <div>{job_page?.jobDescription}</div>
            </div>
            <div className="border"></div>
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Yêu cầu công việc</div>
              <div>
                <div>{job_page?.jobRequirements}</div>
              </div>
            </div>
            <div className="border"></div>
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Quyền lợi</div>
              <div>{job_page?.benefits}</div>
            </div>
          </div>
          {/* Các công việc liên quan */}
          {job_company && relatedJobCount > 0 && (
            <RelatedJobs companyID={Number(job_page?.companyID)} />
          )}
        </div>

        <div className="col-span-1 space-y-4 h-[calc(100vh-4rem)] sticky top-4">
          <div className="rounded-lg border bg-white px-5 py-6 space-y-4">
            <Link href={`/companies/${job_company?.slug}?id=${job_company?.id}`}>
              <div className="flex gap-2 font-bold">
                <Image
                  src={
                    job_company?.avatar
                      ? job_company?.avatar
                      : "https://via.placeholder.com/120"
                  }
                  alt={`${company.name} cover`}
                  width={120}
                  height={120}
                  unoptimized
                />
                <div className="text-lg">{job_company?.name}</div>
              </div>
              <div> {job_company?.name}</div>
            </Link>
            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Mô hình công ty</div>
                <div className="w-1/2 text-right">
                  {job_company?.companyModel}
                </div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Lĩnh vực công ty</div>
                <div className="w-1/2 text-right">
                  Sản Phẩm Phần Mềm và Dịch Vụ Web
                </div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Quy mô công ty</div>
                <div className="w-1/2 text-right">
                  {job_company?.employeeNumber} nhân viên
                </div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Quốc gia</div>
                <div className="w-1/2 text-right">{job_company?.country}</div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Thời gian làm việc</div>
                <div className="w-1/2 text-right">
                  {job_company?.workingTime}
                </div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Làm việc ngoài giờ</div>
                <div className="w-1/2 text-right">{job_company?.overtime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
