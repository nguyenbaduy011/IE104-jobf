import { db } from "@/drizzle/db";
import { company, industry, job } from "@/drizzle/schema/schema";
import { count, eq } from "drizzle-orm";
import {
  Building2,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { redirect } from "next/navigation";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import { RelatedJobs } from "@/components/relatedJob";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface companyProps {
  searchParams: {
    id: string;
  };
}

export default async function CompanyPage({ searchParams }: companyProps) {
  const companyPageID = parseInt(searchParams.id, 10);

  if (isNaN(companyPageID)) {
    console.error("Invalid company ID:", searchParams.id);
    redirect("/");
  }

  let company_page;
  try {
    company_page = await db.query.company.findFirst({
      where: eq(company.id, companyPageID),
    });
  } catch (error) {
    console.error("Error fetching company page:", error);
    redirect("/");
  }

  let company_industry;
  if (company_page?.industryID) {
    try {
      company_industry = await db.query.industry.findFirst({
        where: eq(industry.id, company_page.industryID),
      });
    } catch (error) {
      console.error("Error fetching company industry:", error);
      redirect("/");
    }
  }

  if (!company_page) {
    return (
      <div>
        <h1>Không tìm thấy công ty</h1>
        <p>Công ty bạn đang tìm kiếm không tồn tại.</p>
      </div>
    );
  }

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.attribs) {
        const { name, children } = domNode;

        if (name === "ul") {
          return (
            <ul className="list-disc ml-5">
              {domToReact(children as DOMNode[], options)}
            </ul>
          );
        }

        if (name === "ol") {
          return (
            <ol className="list-decimal ml-5">
              {domToReact(children as DOMNode[], options)}
            </ol>
          );
        }

        if (name === "p") {
          return (
            <p className="mb-4">{domToReact(children as DOMNode[], options)}</p>
          );
        }
      }
    },
  };

  const jobs = await db
    .select({ count: count() })
    .from(job)
    .where(eq(job.companyID, companyPageID));
  const jobCount = jobs[0].count ?? 0;
  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* header công ty */}
        <Card className="overflow-hidden">
          <div className="relative w-full h-48 sm:h-64 bg-gradient-to-r from-gray-100 to-gray-200">
            {company_page.coverImage && (
              <Image
                src={company_page.coverImage}
                alt={`${company_page.name} cover`}
                fill
                className="object-contain"
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative px-6 pb-6">
            <div className="flex flex-col items-center -mt-16 sm:-mt-20">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-white bg-white shadow-lg">
                <Image
                  src={company_page.avatar || "/placeholder.svg"}
                  alt={`${company_page.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                  unoptimized
                />
              </div>

              <div className="mt-4 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {company_page.name}
                </h1>

                <div className="mt-2 flex flex-wrap justify-center gap-3">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Building2 className="w-3 h-3" />
                    {company_page.employeeNumber}+ Nhân viên
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Users className="w-3 h-3" />
                    1000 người theo dõi
                  </Badge>
                  {company_industry && (
                    <Badge variant="secondary">{company_industry.name}</Badge>
                  )}
                </div>

                {company_page.website && (
                  <a
                    href={company_page.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="w-4 h-4" />
                    {new URL(company_page.website).hostname}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Thông tin chính */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thông tin chung */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin chung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <div className="text-sm text-gray-500">Mô hình công ty</div>
                    <div className="mt-1 font-medium">
                      {company_page.companyModel || "Chưa cập nhật"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Quốc gia</div>
                    <div className="mt-1 font-medium">
                      {company_page.country || "Chưa cập nhật"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Thời gian làm việc
                    </div>
                    <div className="mt-1 font-medium">
                      {company_page.workingTime || "Chưa cập nhật"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">
                      Làm việc ngoài giờ
                    </div>
                    <div className="mt-1 font-medium">
                      {company_page.overtime || "Chưa cập nhật"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Giới thiệu công ty */}
            <Card>
              <CardHeader>
                <CardTitle>Giới thiệu công ty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {company_page!.introduction
                    ? parse(company_page!.introduction, options)
                    : "Không có thông tin giới thiệu."}
                </div>
              </CardContent>
            </Card>

            {/* Lợi ích */}
            <Card>
              <CardHeader>
                <CardTitle>Quyền lợi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {company_page!.benefits
                    ? parse(company_page!.benefits, options)
                    : "Không có thông tin phúc lợi."}
                </div>
              </CardContent>
            </Card>

            {/* Các công việc liên quan */}
            {jobCount > 0 && <RelatedJobs companyID={Number(companyPageID)} />}
          </div>

          {/* Thanh thông tin */}
          <div className="space-y-6">
            {/* Thông tin liên lạc */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin liên hệ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Địa chỉ</div>
                    <div className="text-gray-600 mt-0.5">
                      {company_page.address || "Chưa cập nhật"}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    {company_page.email ? (
                      <Link
                        href={`mailto:${company_page.email}`}
                        className="text-blue-600 hover:text-blue-800 mt-0.5 block"
                      >
                        {company_page.email}
                      </Link>
                    ) : (
                      <div className="text-gray-600 mt-0.5">Chưa cập nhật</div>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="font-medium">Số điện thoại</div>
                    {company_page.phoneNumber ? (
                      <Link
                        href={`tel:${company_page.phoneNumber}`}
                        className="text-blue-600 hover:text-blue-800 mt-0.5 block"
                      >
                        {company_page.phoneNumber}
                      </Link>
                    ) : (
                      <div className="text-gray-600 mt-0.5">Chưa cập nhật</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Các thao tác khác */}
            <Card>
              <CardContent className="pt-6">
                <Button className="w-full" size="lg">
                  Theo dõi công ty
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="in-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
//   <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
//     <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
//       {/* Ảnh bìa công ty */}
//       <div className="relative w-full h-48">
//         <Image
//           src={
//             company_page.coverImage
//               ? company_page.coverImage
//               : "https://via.placeholder.com/1200x400"
//           }
//           alt="Ảnh bìa công ty"
//           className="object-contain"
//           fill
//         />
//         {/* Avatar công ty */}
//         <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
//           <div className="relative w-32 h-32 rounded-full overflow-hidden">
//             <Image
//               src={
//                 company_page.avatar
//                   ? company_page.avatar
//                   : "https://via.placeholder.com/150"
//               }
//               alt="Avatar công ty"
//               className="object-contain bg-white"
//               fill
//               sizes="128px"
//             />
//           </div>
//         </div>
//       </div>
//       {/* Phần thông tin công ty */}
//       <div className="pt-16 px-6 pb-6 text-center flex flex-col items-center gap-2">
//         <h2 className="text-2xl font-bold text-gray-800">
//           {company_page.name}
//         </h2>
//         <div className="text-xs flex gap-2">
//           <div className="flex gap-1 text-gray-700 text-center">
//             <Building2 size={16} />
//             <p>{company_page.employeeNumber}+ Nhân viên</p>
//           </div>
//           <div className="flex gap-1 text-gray-700 items-center">
//             <Users size={16} />
//             <p>1000 người theo dõi</p>
//           </div>
//         </div>
//         <div className="text-gray-700 flex gap-1 items-center text-xs">
//           <Globe size={16} />
//           <a href={company_page.website}>{company_page.website}</a>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="py-8 grid grid-cols-3 gap-6 max-w-7xl mx-auto">
//     {/* Cột 1: Thông tin chung, giới thiệu công ty, phúc lợi  */}
//     <div className="col-span-2 space-y-6">
//       {/* Thông tin chung */}
//       <div className="rounded-lg border bg-white">
//         <div className="py-2 px-4">
//           <div className="text-xl font-semibold border-b-2 py-3">
//             Thông tin chung
//           </div>
//           <div className="py-2">
//             <div className="grid grid-cols-3 gap-x-8 gap-y-2">
//               <div className="col-span-1">
//                 <div className="text-gray-400 text-sm">Mô hình công ty</div>
//                 <div className="text-base">{company_page.companyModel}</div>
//               </div>
//               <div className="col-span-1">
//                 <div className="text-gray-400 text-sm">
//                   Lĩnh vực công ty
//                 </div>
//                 <div className="text-base">{company_industry?.name}</div>
//               </div>
//               <div className="col-span-1">
//                 <div className="text-gray-400 text-sm">Quy mô công ty</div>
//                 <div className="text-base">
//                   {company_page.employeeNumber}+ nhân viên
//                 </div>
//               </div>
//               <div>
//                 <div className="text-gray-400 text-sm">Quốc gia</div>
//                 <div className="text-base">{company_page.country}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400 text-sm">
//                   Thời gian làm việc
//                 </div>
//                 <div className="text-base">{company_page.workingTime}</div>
//               </div>
//               <div>
//                 <div className="text-gray-400 text-sm">
//                   Làm việc ngoài giờ
//                 </div>
//                 <div className="text-base">{company_page.overtime}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Giới thiệu công ty */}
//       <div className="rounded-lg border bg-white">
//         <div className="py-2 px-4">
//           <div className="text-xl font-semibold border-b-2 py-3">
//             Giới thiệu công ty
//           </div>
//           <div className="py-2">
//             {company_page!.introduction
//               ? parse(company_page!.introduction, options)
//               : "Không có thông tin giới thiệu."}
//           </div>
//         </div>
//       </div>

//       {/* Quyền lợi */}
//       <div className="rounded-lg border bg-white">
//         <div className="py-2 px-4">
//           <div className="text-xl font-semibold border-b-2 py-3">
//             Quyền lợi
//           </div>
//           <div className="py-2">
// {company_page!.benefits
//   ? parse(company_page!.benefits, options)
//   : "Không có thông tin phúc lợi."}
//           </div>
//         </div>
//       </div>

//       {/* Các vị trí tuyển dụng */}
//       {jobCount > 0 && <RelatedJobs companyID={Number(companyPageID)} />}
//     </div>

//     {/* Cột 2: Thông tin liên lạc */}
//     <div className="col-span-1 space-y-4">
//       <div className="rounded-lg border bg-white">
//         <div className="py-2 px-4">
//           <div className="text-xl font-semibold border-b-2 py-3">
//             Thông tin liên lạc
//           </div>
//           <div>
//             <div className="py-2">Địa chỉ: {company_page.address}</div>
//             <div className="py-2">Email: {company_page.email}</div>
//             <div className="py-2">
//               Số điện thoại: {company_page.phoneNumber}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
