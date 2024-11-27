import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export default function Home() {
  return (
    <div className="bg-gray-100">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[300px] flex items-center mx-auto">
        <div className="w-[1000] mx-auto h-14 bg-white rounded-full flex items-center justify-center gap-3 p-3">
          <Input
            className="w-[600px] rounded-full"
            placeholder="Vị trí tuyển dụng, tên công ty"
          />
          <ComboboxDemo />
          <Button className="bg-primary rounded-full"><Search/>Tìm kiếm</Button>
        </div>
      </div>
      <div className="h-screen w-[1000px] flex flex-col items-center mx-auto">
        <h1 className="text-2xl font-bold py-4">Việc làm tốt nhất</h1>
        <div className="grid grid-cols-3 gap-10 p-4">
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="w-80 h-28 bg-slate-400 rounded-sm flex p-4 gap-4 hover:bg-slate-300">
            {/* Ô đỏ cố định */}
            <div className="w-[80px] h-[80px] bg-red-600 flex-shrink-0"></div>

            {/* Phần nội dung */}
            <div className="flex flex-col w-[calc(100%-100px)] gap-2">
              <div className="flex-1 overflow-hidden">
                {/* H2 và H3 */}
                <h2 className="text-base font-bold text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán Tổng Hợp Kế Toán
                  Tổng Hợp
                </h2>
                <h3 className="text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap w-full">
                  CÔNG TY TNHH I-GLOCAL Kế Toán Tổng Hợp Kế Toán Tổng Hợp
                </h3>
              </div>
              {/* Thông tin bổ sung */}
              <div className="flex gap-2">
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Trên 13 triệu
                </div>
                <div className="bg-slate-300 px-2 rounded-md text-xs">
                  Hồ Chí Minh
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
