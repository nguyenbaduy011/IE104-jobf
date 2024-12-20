/* eslint-disable @next/next/no-img-element */
import { db } from "@/drizzle/db";
import { company, industry, job } from "@/drizzle/schema/schema";
import { count, eq } from "drizzle-orm";
import { Building2, Globe, Users } from "lucide-react";
import { redirect } from "next/navigation";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import { RelatedJobs } from "@/components/relatedJob";

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

  // let company_area;
  // if (company_page?.areaID) {
  //   try {
  //     company_area = await db.query.area.findFirst({
  //       where: eq(area.id, company_page.areaID),
  //     });
  //   } catch (error) {
  //     console.error("Error fetching company industry:", error);
  //     redirect("/");
  //   }
  // }

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
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
        <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Ảnh bìa công ty */}
          <div className="relative">
            <img
              src={
                company_page.coverImage
                  ? company_page.coverImage
                  : "https://via.placeholder.com/1200x400"
              }
              alt="Ảnh bìa công ty"
              className="w-full h-48 object-cover"
            />
            {/* Avatar công ty */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={
                  company_page.avatar
                    ? company_page.avatar
                    : "https://via.placeholder.com/150"
                }
                alt="Avatar công ty"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
          {/* Phần thông tin công ty */}
          <div className="pt-16 px-6 pb-6 text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {company_page.name}
            </h2>
            <div className="text-xs flex gap-2">
              <div className="flex gap-1 text-gray-700 text-center">
                <Building2 size={16} />
                <p>{company_page.employeeNumber}+ Nhân viên</p>
              </div>
              <div className="flex gap-1 text-gray-700 items-center">
                <Users size={16} />
                <p>1000 người theo dõi</p>
              </div>
            </div>
            <div className="text-gray-700 flex gap-1 items-center text-xs">
              <Globe size={16} />
              <a href={company_page.website}>{company_page.website}</a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Cột 1: Thông tin chung, giới thiệu công ty, phúc lợi  */}
        <div className="col-span-2 space-y-6">
          {/* Thông tin chung */}
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Thông tin chung
              </div>
              <div className="py-2">
                <div className="grid grid-cols-3 gap-x-8 gap-y-2">
                  <div className="col-span-1">
                    <div className="text-gray-400 text-sm">Mô hình công ty</div>
                    <div className="text-base">{company_page.companyModel}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-gray-400 text-sm">
                      Lĩnh vực công ty
                    </div>
                    <div className="text-base">{company_industry?.name}</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-gray-400 text-sm">Quy mô công ty</div>
                    <div className="text-base">
                      {company_page.employeeNumber}+ nhân viên
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Quốc gia</div>
                    <div className="text-base">{company_page.country}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">
                      Thời gian làm việc
                    </div>
                    <div className="text-base">{company_page.workingTime}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">
                      Làm việc ngoài giờ
                    </div>
                    <div className="text-base">{company_page.overtime}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Giới thiệu công ty */}
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Giới thiệu công ty
              </div>
              <div className="py-2">
                {company_page!.introduction
                  ? parse(company_page!.introduction, options)
                  : "Không có thông tin giới thiệu."}
              </div>
            </div>
          </div>

          {/* Quyền lợi */}
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Quyền lợi
              </div>
              <div className="py-2">
                {company_page!.benefits
                  ? parse(company_page!.benefits, options)
                  : "Không có thông tin phúc lợi."}
              </div>
            </div>
          </div>

          {/* Các vị trí tuyển dụng */}
          {jobCount > 0 && <RelatedJobs companyID={Number(companyPageID)} />}
        </div>

        {/* Cột 2: Thông tin liên lạc */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Thông tin liên lạc
              </div>
              <div>
                <div className="py-2">Địa chỉ: {company_page.address}</div>
                <div className="py-2">Email: {company_page.email}</div>
                <div className="py-2">
                  Số điện thoại: {company_page.phoneNumber}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
