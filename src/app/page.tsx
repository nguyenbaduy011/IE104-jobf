import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
    return (
        <div className="bg-gray-100 min-h-screen text-gray-800">
            <div className="bg-white shadow-md">
                <div className="w-[1100px] mx-auto py-4 flex flex-col gap-4 h-[300px] justify-center">
                    <h1 className="text-2xl font-bold ">Việc làm tốt nhất</h1>

                    {/* <div className="flex items-center bg-gray-100 p-3 rounded-full shadow-md gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                className="w-full rounded-full pl-12 pr-4 py-2 border-none bg-white focus:ring-2 focus:ring-green-500 text-gray-600 placeholder-gray-400"
                                placeholder="Tìm kiếm vị trí tuyển dụng hoặc công ty..."
                            />
                        </div>

                        <select className="bg-white border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">Lọc theo: Địa điểm</option>
                            <option value="hanoi">Hà Nội</option>
                            <option value="hcmc">Hồ Chí Minh</option>
                            <option value="danang">Đà Nẵng</option>
                        </select>

                        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full flex items-center gap-2">
                            <Search />
                            Tìm kiếm
                        </button>
                    </div> */}
                    <div className="w-[1000] mx-auto h-14 bg-white rounded-full flex items-center justify-center gap-3 p-3 border">
                        <Input
                            className="w-[600px] rounded-full"
                            placeholder="Vị trí tuyển dụng, tên công ty"
                        />
                        <ComboboxDemo />
                        <div className="border border-r-1 h-8"></div>
                        <Button className="bg-primary rounded-full">
                            <Search />
                            Tìm kiếm
                        </Button>
                    </div>
                    <div className="flex gap-4">
                        {[
                            "Tất Cả",
                            "Hà Nội",
                            "Hồ Chí Minh",
                            "Miền Bắc",
                            "Miền Nam",
                        ].map((tag, index) => (
                            <Button
                                key={index}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                    index === 0
                                        ? " text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-[1100px] mx-auto py-8">
                <div className="grid grid-cols-3 gap-6">
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white border border-gray-200 rounded-md shadow hover:shadow-lg transition-shadow p-4 flex flex-col gap-3"
                        >
                            {/* Logo */}
                            <img
                                src="https://via.placeholder.com/60x60"
                                className="w-[60px] h-[60px] bg-gray-300 rounded-md mx-auto"
                            />

                            {/* Job Info */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-base font-semibold text-gray-800 truncate">
                                    Nhân Viên Kinh Doanh/ Tư Vấn
                                </h2>
                                <h3 className="text-sm text-gray-500 truncate">
                                    Công Ty TNHH Kewpie Việt Nam
                                </h3>
                            </div>

                            {/* Additional Info */}
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                    Thỏa thuận
                                </span>
                                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded">
                                    Hà Nội, Hải Phòng
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-[1100px] mx-auto py-4 flex justify-between items-center text-gray-600">
                <button className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200">
                    &larr; Trang trước
                </button>
                <span className="text-sm">2 / 39 trang</span>
                <button className="bg-gray-100 px-4 py-2 rounded-full text-sm hover:bg-gray-200">
                    Trang sau &rarr;
                </button>
            </div>
        </div>
    );
}
