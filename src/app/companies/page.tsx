import { Building2, Globe, Users } from "lucide-react";

const CompanyPanel = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-4">
      <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
        <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Ảnh bìa công ty */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/1200x400"
              alt="Ảnh bìa công ty"
              className="w-full h-48 object-cover"
            />
            {/* Avatar công ty */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="https://via.placeholder.com/150"
                alt="Avatar công ty"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
          {/* Phần thông tin công ty */}
          <div className="pt-16 px-6 pb-6 text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-800">Tên công ty</h2>
            <div className="text-xs flex gap-2">
              <div className="flex gap-1 text-gray-700 text-center">
                <Building2 size={16} />
                <p>1000+ Nhân viên</p>
              </div>
              <div className="flex gap-1 text-gray-700 items-center">
                <Users size={16} />
                <p>1000 người theo dõi</p>
              </div>
            </div>
            <div className="text-gray-700 flex gap-1 items-center text-xs">
              <Globe size={16} />
              <p>https://www.facebook.com/</p>
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
                    <div className="text-base">Sản phẩm</div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-gray-400 text-sm">
                      Lĩnh vực công ty
                    </div>
                    <div className="text-base">
                      Sản Phẩm Phần Mềm và Dịch Vụ Web
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="text-gray-400 text-sm">Quy mô công ty</div>
                    <div className="text-base">Sản phẩm</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Quốc gia</div>
                    <div className="text-base">Việt Nam</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">
                      Thời gian làm việc
                    </div>
                    <div className="text-base">Thứ 2 - Thứ 6</div>
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
                Mô tả đầy đủ về công ty, bao gồm: Lịch sử thành lập. Thành tựu
                nổi bật. Đối tác chiến lược và khách hàng tiêu biểu. Văn hóa
                công ty (môi trường làm việc, các hoạt động nội bộ).
              </div>
            </div>
          </div>

          {/* Tại sao bạn sẽ yêu thích làm việc tại đây */}
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Tại sao bạn sẽ yêu thích làm việc tại đây
              </div>
              <div className="py-2">
                13th month salary + Incentive bonus (Total remuneration package
                / year: up to 16-month salary) + Annual salary review; HYBRID
                WORKING, flexible working time (Mon - Fri) Support for lunch,
                transportation and other allowances (Coding Expert, Technical
                leader, phone...); Premium health care & accident insurance;
                Total 20 days off (12 days of annual leave & additional 8 days
                of company holidays: Summer holiday, Mid-Autumn, Christmas, LG
                and VS DCV Foundation Days); Support fee to get TOEIC &
                technical certifications (ISTQB, Agile Scrum...); On-site &
                training opportunities abroad; Company trip, sport clubs (zumba,
                football, pingpong, badminton,...); Monthly budget for team
                activities, etc.
              </div>
            </div>
          </div>

          {/* Các vị trí tuyển dụng */}
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Các vị trí tuyển dụng
              </div>
              <div className="py-2"></div>
            </div>
          </div>
        </div>

        {/* Cột 2: Thông tin liên lạc */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border bg-white">
            <div className="py-2 px-4">
              <div className="text-xl font-semibold border-b-2 py-3">
                Thông tin liên lạc
              </div>
              <div className="py-2">Địa chỉ: Gmail: Số điện thoại:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CompanyPage() {
  return (
    <div>
      <CompanyPanel />
    </div>
  );
}
