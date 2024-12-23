import { RelatedJobs } from "@/components/relatedJob";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { company, job } from "@/drizzle/schema/schema";
import { count, eq } from "drizzle-orm";
import {
  Banknote,
  Briefcase,
  Building2,
  CalendarDays,
  Clock,
  ExternalLink,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  MonitorCog,
  Send,
  Trophy,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                      {job_page?.jobTitle}
                    </h1>
                    <Link
                      href={`/companies/${job_company?.slug}?id=${job_company?.id}`}
                      className="text-lg text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {job_company?.name}
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-green-700">
                    <Banknote className="h-5 w-5" />
                    <span className="font-bold text-lg">
                      {job_page?.salary || "Thương lượng"}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>
                        {job_company?.address || "Chưa cập nhật địa điểm"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MonitorCog className="h-4 w-4 text-gray-400" />
                      <span>{job_page?.workingWay || "Chưa cập nhật"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gray-400" />
                      <span>Đăng: {formattedDate}</span>
                    </div>
                  </div>

                  {job_page?.requiredSkills && (
                    <div className="flex flex-wrap gap-2">
                      {job_page?.requiredSkills
                        .split(",")
                        .map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill.trim()}
                          </Badge>
                        ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button size="lg" className="flex-1">
                      <Send className="mr-2 h-4 w-4" />
                      Ứng tuyển ngay
                    </Button>
                    <Button size="lg" variant="outline">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Job Description */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    Mô tả công việc
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {job_page?.jobDescription}
                  </div>
                </div>

                <Separator />

                {/* Job Requirements */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-gray-500" />
                    Yêu cầu công việc
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {job_page?.jobRequirements}
                  </div>
                </div>

                <Separator />

                {/* Benefits */}
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-gray-500" />
                    Quyền lợi
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {job_page?.benefits}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            {job_company && relatedJobCount > 0 && (
              <RelatedJobs companyID={Number(job_page?.companyID)} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-6">
              <Card>
                <CardHeader>
                  <Link
                    href={`/companies/${job_company?.slug}?id=${job_company?.id}`}
                    className="flex items-start gap-4 group"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={job_company?.avatar || "/placeholder.svg"}
                        alt={`${job_company?.name || "Company"} logo`}
                        fill
                        className="rounded-lg object-contain group-hover:scale-105 transition-transform duration-200"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {job_company?.name}
                      </CardTitle>
                      <CardDescription>
                        Xem thông tin công ty
                        <ExternalLink className="ml-1 h-3 w-3 inline" />
                      </CardDescription>
                    </div>
                  </Link>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Mô hình
                      </span>
                      <span className="font-medium">
                        {job_company?.companyModel || "Chưa cập nhật"}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Quy mô
                      </span>
                      <span className="font-medium">
                        {job_company?.employeeNumber
                          ? `${job_company.employeeNumber}+ nhân viên`
                          : "Chưa cập nhật"}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Quốc gia
                      </span>
                      <span className="font-medium">
                        {job_company?.country || "Chưa cập nhật"}
                      </span>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Giờ làm việc
                      </span>
                      <span className="font-medium">
                        {job_company?.workingTime || "Chưa cập nhật"}
                      </span>
                    </div>

                    {job_company?.overtime && (
                      <>
                        <Separator />
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">OT</span>
                          <span className="font-medium">
                            {job_company.overtime}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="bg-gray-100 min-h-screen py-4">
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
                <div className="flex gap-2 items-center">
                  <MapPin size={20} className="text-gray-400" />
                  <div>Địa điểm: {job_company?.address}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <MonitorCog size={20} className="text-gray-400" />
                  <div>Hình thức làm việc: {job_page?.workingWay}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <CalendarDays size={20} className="text-gray-400" />
                  <div>Ngày đăng: {formattedDate}</div>
                </div>
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
    </div> */
}
