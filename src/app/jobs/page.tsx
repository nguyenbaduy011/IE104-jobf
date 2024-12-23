/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarDays,
  Heart,
  MapPin,
  MonitorCog,
  Send,
} from "lucide-react";
import Image from "next/image";

const JobPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="py-2 grid grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="col-span-2 space-y-4">
          <div className="rounded-lg border bg-white px-4 py-6">
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold">Senior Java Developer</div>
              <div className="text-gray-800 text-base">Tên công ty</div>
              <div className="flex gap-2 text-green-700 font-bold text-lg items-center">
                <Banknote />
                <div>Lương</div>
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
                  <div>Địa chỉ</div>
                </div>
                {/* Hình thức làm việc */}
                <div className="flex gap-2 items-center">
                  <MonitorCog size={20} className="text-gray-400" />
                  <div>Hình thức làm việc</div>
                </div>
                {/* Ngày đăng */}
                <div className="flex gap-2 items-center">
                  <CalendarDays size={20} className="text-gray-400" />
                  <div>Ngày đăng</div>
                </div>
                {/* Kỹ năng yêu cầu */}
                <div className="flex gap-2 items-center">
                  <div>Kỹ năng: </div>
                  <div>Kỹ năng yêu cầu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-white px-4 py-6 space-y-6">
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Mô tả công việc</div>
              <div>
                <div>
                  - Guide Secure SW Development Methologies to Developers
                  (Threat Modeling, TARA, CVSS, etc)
                </div>
                <div>
                  - Security Design & Review for the Embedded SW (To ensure the
                  security of the SW modules, design together with the dev teams
                  and review teams outputs.)
                </div>
                <div>
                  - Design and Implement for System Hardening (incl. OS
                  Hardening, Memory Hardening)
                </div>
              </div>
            </div>
            <div className="border"></div>
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Yêu cầu công việc</div>
              <div>
                <div>
                  - Bachelors degree in computer science / engineering or
                  equivalent practical experience
                </div>
                <div>- 3+ years of experience in SW Security</div>
                <div>
                  - Understanding for Cybersecurity Engineering (NIST CSF/RMF,
                  threat modeling, TARA, and etc)
                </div>
              </div>
            </div>
            <div className="border"></div>
            <div className="gap-1 flex flex-col">
              <div className="text-2xl font-bold">Quyền lợi</div>
              <div>
                <div>
                  13th month salary + Incentive bonus (Total remuneration
                  package / year: up to 16-month salary) + Annual salary review;
                  HYBRID WORKING, flexible working time (Mon - Fri) Support for
                  lunch, transportation and other allowances (Coding Expert,
                  Technical leader, phone...); Premium health care & accident
                  insurance; Total 20 days off (12 days of annual leave &
                  additional 8 days of company holidays: Summer holiday,
                  Mid-Autumn, Christmas, LG and VS DCV Foundation Days); Support
                  fee to get TOEIC & technical certifications (ISTQB, Agile
                  Scrum...); On-site & training opportunities abroad; Company
                  trip, sport clubs (zumba, football, pingpong, badminton,...);
                  Monthly budget for team activities, etc.
                </div>
                <div>- 3+ years of experience in SW Security</div>
                <div>
                  - Understanding for Cybersecurity Engineering (NIST CSF/RMF,
                  threat modeling, TARA, and etc)
                </div>
              </div>
            </div>
          </div>
          {/* Các công việc liên quan */}
          <div className="rounded-lg border bg-white">
            <div className="py-5 px-4 space-y-3">
              <div className="text-xl font-semibold border-b-2">
                Các vị trí đang tuyển dụng (... vị trí)
              </div>
              {/* Job card */}
              <div>
                <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-amber-50 shadow-sm">
                  <div className="text-xs text-gray-500 mb-2">
                    Đăng 25 ngày trước
                  </div>

                  <div className="flex items-center my-2">
                    <img
                      src="https://via.placeholder.com/80" // Thay bằng link logo thực tế
                      alt="Company Logo"
                      className="w-20 h-20 rounded-sm mr-3"
                    />
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        Software Engineer (Android, Python)
                      </div>
                      <p className="font-medium text-gray-700">
                        LG Electronics Development Vietnam (LGEDV)
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-green-700 font-bold text-sm items-center">
                    <Banknote />
                    <div>Lương</div>
                  </div>
                  <div className="border border-dashed"></div>
                  <div className="text-sm">
                    {/* Địa điểm làm việc */}
                    <div className="flex gap-2 items-center">
                      <MapPin size={20} className="text-gray-400" />
                      <div>Địa chỉ</div>
                    </div>
                    {/* Hình thức làm việc */}
                    <div className="flex gap-2 items-center">
                      <MonitorCog size={20} className="text-gray-400" />
                      <div>Hình thức làm việc</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-4 h-[calc(100vh-4rem)] sticky top-4">
          <div className="rounded-lg border bg-white px-5 py-6 space-y-4">
            <div className="flex gap-2 font-bold">
              <Image
                src="https://via.placeholder.com/120x120"
                className="bg-red-600 flex-shrink-0"
                alt="Ảnh công ty"
                width={120}
                height={120}
              />
              <div className="text-lg">
                LG Electronics Development Vietnam (LGEDV)
              </div>
            </div>
            <div>LG Electronics Development Vietnam (LGEDV)</div>
            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Mô hình công ty</div>
                <div className="w-1/2 text-right">Sản phẩm</div>
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
                <div className="w-1/2 text-right">1000+ nhân viên</div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Quốc gia</div>
                <div className="w-1/2 text-right">Hàn Quốc</div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Thời gian làm việc</div>
                <div className="w-1/2 text-right">Thứ 2 - Thứ 6</div>
              </div>
              <div className="border border-dashed"></div>
              <div className="flex justify-between font-semibold text-sm">
                <div className="text-gray-400">Làm việc ngoài giờ</div>
                <div className="w-1/2 text-right">Thêm lương OT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function JobPage() {
  return (
    <div>
      <JobPanel />
    </div>
  );
}
