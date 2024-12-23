// export default function faq_2() {
//     return (
//         <main className="bg-gray-100 p-6">
//             <section className="max-w-6xl mx-auto">
//                 <header className="text-center mb-10">
//                     <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//                         Hướng dẫn chi tiết để ứng tuyển trên JobF
//                     </h1>
//                     <p className="text-lg text-gray-600">
//                         Nắm bắt từng bước để tối ưu hóa cơ hội việc làm của bạn
//                         trên JobF.
//                     </p>
//                 </header>

import Link from "next/link";

//                 <div className="space-y-12">
//                     <div className="flex items-start j space-x-6">
//                         <div className="flex-shrink-0">
//                             <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                                 1
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                                 Đăng ký tài khoản JobF
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Để bắt đầu, bạn cần có một tài khoản trên JobF.
//                                 Quy trình đăng ký rất đơn giản:
//                             </p>
//                             <ol className="list-decimal list-inside text-gray-600 space-y-2">
//                                 <li>
//                                     Truy cập trang chủ JobF và nhấp vào nút{" "}
//                                     <span className="font-medium">
//                                         &quot;Đăng ký&quot;
//                                     </span>
//                                     .
//                                 </li>
//                                 <li>
//                                     Điền đầy đủ thông tin: email, mật khẩu và số
//                                     điện thoại.
//                                 </li>
//                                 <li>
//                                     Xác nhận email bằng cách nhấp vào liên kết
//                                     được gửi đến hộp thư của bạn.
//                                 </li>
//                                 <li>
//                                     Hoàn tất hồ sơ cá nhân bằng cách thêm ảnh
//                                     đại diện, thông tin cá nhân và một đoạn giới
//                                     thiệu ngắn gọn.
//                                 </li>
//                             </ol>
//                         </div>
//                     </div>

//                     <div className="flex items-start space-x-6">
//                         <div className="flex-shrink-0">
//                             <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                                 2
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                                 Cách viết CV chuyên nghiệp
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Một CV ấn tượng là yếu tố quan trọng giúp bạn
//                                 thu hút nhà tuyển dụng. Hãy thực hiện theo hướng
//                                 dẫn sau:
//                             </p>
//                             <ul className="list-disc list-inside text-gray-600 space-y-2">
//                                 <li>
//                                     <span className="font-medium">
//                                         Thông tin liên lạc:
//                                     </span>{" "}
//                                     Bao gồm tên, số điện thoại, email chuyên
//                                     nghiệp.
//                                 </li>
//                                 <li>
//                                     <span className="font-medium">
//                                         Mục tiêu nghề nghiệp:
//                                     </span>{" "}
//                                     Ngắn gọn, nêu rõ định hướng và giá trị bạn
//                                     mang lại.
//                                 </li>
//                                 <li>
//                                     <span className="font-medium">
//                                         Kinh nghiệm làm việc:
//                                     </span>{" "}
//                                     Mô tả công việc, thành tựu đạt được và kỹ
//                                     năng đã áp dụng.
//                                 </li>
//                                 <li>
//                                     <span className="font-medium">
//                                         Kỹ năng:
//                                     </span>{" "}
//                                     Liệt kê các kỹ năng liên quan trực tiếp đến
//                                     vị trí bạn ứng tuyển.
//                                 </li>
//                                 <li>
//                                     <span className="font-medium">
//                                         Học vấn:
//                                     </span>{" "}
//                                     Chỉ liệt kê những bằng cấp hoặc chứng chỉ
//                                     quan trọng.
//                                 </li>
//                                 <li>
//                                     Sử dụng công cụ tạo CV trực tuyến trên JobF
//                                     để định dạng đẹp mắt và chuyên nghiệp.
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     <div className="flex items-start space-x-6">
//                         <div className="flex-shrink-0">
//                             <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                                 3
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                                 Tìm kiếm danh sách việc làm
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Sử dụng chức năng tìm kiếm trên JobF để tìm kiếm
//                                 cơ hội phù hợp với bạn:
//                             </p>
//                             <ul className="list-disc list-inside text-gray-600 space-y-2">
//                                 <li>
//                                     Sử dụng từ khóa liên quan đến lĩnh vực hoặc
//                                     vị trí mong muốn.
//                                 </li>
//                                 <li>
//                                     Áp dụng các bộ lọc: địa điểm, mức lương,
//                                     loại hình công việc (toàn thời gian, bán
//                                     thời gian).
//                                 </li>
//                                 <li>
//                                     Thêm công việc yêu thích vào danh sách
//                                     &quot;Lưu công việc&quot; để dễ dàng truy
//                                     cập sau này.
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     <div className="flex items-start space-x-6">
//                         <div className="flex-shrink-0">
//                             <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                                 4
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                                 Ứng tuyển và theo dõi trạng thái
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Sau khi tìm được công việc phù hợp, hãy thực
//                                 hiện các bước sau:
//                             </p>
//                             <ul className="list-disc list-inside text-gray-600 space-y-2">
//                                 <li>
//                                     Nhấp vào nút{" "}
//                                     <span className="font-medium">
//                                         &quot;Ứng tuyển&quot;
//                                     </span>{" "}
//                                     trên trang chi tiết công việc.
//                                 </li>
//                                 <li>
//                                     Tải lên CV và thêm thư ứng tuyển (nếu cần).
//                                 </li>
//                                 <li>
//                                     Theo dõi trạng thái ứng tuyển trong mục
//                                     &quot;Quản lý ứng tuyển&quot;.
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 <p className="mt-8 text-lg text-center">
//                     Để biết thêm thông tin, hãy quay lại{" "}
//                     <a
//                         href="/faq"
//                         className="text-blue-600 font-medium underline hover:text-blue-800"
//                     >
//                         trang FAQ
//                     </a>
//                     .
//                 </p>
//             </section>
//         </main>
//     );
// }

export default function faq_2() {
    return (
        <main className="bg-gray-100 p-8">
            <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Hướng dẫn chi tiết để ứng tuyển trên JobF
                    </h1>
                    <p className="text-lg text-gray-600">
                        Nắm bắt từng bước để tối ưu hóa cơ hội việc làm của bạn
                        trên JobF.
                    </p>
                </header>

                {/* Content Section */}
                <div className="bg-gray-100">
                    <div className="p-6">
                        <div className="flex">
                            {/* <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    1
                                </div>
                            </div> */}
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Đăng ký tài khoản JobF
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Để bắt đầu, bạn cần có một tài khoản trên
                                    JobF. Quy trình đăng ký rất đơn giản:
                                </p>
                                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                                    <li>
                                        Truy cập trang chủ{" "}
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-gray-800 underline font-bold"
                                        >
                                            JobF
                                        </a>{" "}
                                        và nhấp vào nút &quot;Đăng ký&quot; .
                                    </li>
                                    <li>
                                        Điền đầy đủ thông tin như email, mật
                                        khẩu và số điện thoại.
                                    </li>
                                    <li>
                                        Xác nhận email bằng cách nhấp vào liên
                                        kết được gửi đến hộp thư của bạn.
                                    </li>
                                    <li>
                                        Hoàn tất hồ sơ cá nhân bằng cách thêm
                                        ảnh đại diện, thông tin cá nhân và một
                                        đoạn giới thiệu ngắn gọn.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex">
                            {/* <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    2
                                </div>
                            </div> */}
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Cách viết CV chuyên nghiệp
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Một CV ấn tượng là yếu tố quan trọng giúp
                                    bạn thu hút nhà tuyển dụng. Hãy thực hiện
                                    theo hướng dẫn sau:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-4">
                                    <li>
                                        <span className="font-medium">
                                            Thông tin liên lạc:
                                        </span>{" "}
                                        Bao gồm tên, số điện thoại, email chuyên
                                        nghiệp.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Mục tiêu nghề nghiệp:
                                        </span>{" "}
                                        Ngắn gọn, nêu rõ định hướng và giá trị
                                        bạn mang lại.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Kinh nghiệm làm việc:
                                        </span>{" "}
                                        Mô tả công việc, thành tựu đạt được và
                                        kỹ năng đã áp dụng.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Kỹ năng:
                                        </span>{" "}
                                        Liệt kê các kỹ năng liên quan trực tiếp
                                        đến vị trí bạn ứng tuyển.
                                    </li>
                                    <li>
                                        <span className="font-medium">
                                            Học vấn:
                                        </span>{" "}
                                        Chỉ liệt kê những bằng cấp hoặc chứng
                                        chỉ quan trọng.
                                    </li>
                                    <li>
                                        Sử dụng công cụ tạo CV trực tuyến trên
                                        JobF để định dạng đẹp mắt và chuyên
                                        nghiệp.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex">
                            {/* <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    3
                                </div>
                            </div> */}
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Tìm kiếm danh sách việc làm
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Sử dụng chức năng tìm kiếm trên JobF để tìm
                                    kiếm cơ hội phù hợp với bạn:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-4">
                                    <li>
                                        Sử dụng từ khóa liên quan đến lĩnh vực
                                        hoặc vị trí mong muốn.
                                    </li>
                                    <li>
                                        Áp dụng các bộ lọc: địa điểm, mức lương,
                                        loại hình công việc (toàn thời gian, bán
                                        thời gian).
                                    </li>
                                    <li>
                                        Thêm công việc yêu thích vào danh sách
                                        &quot;Lưu công việc&quot; để dễ dàng
                                        truy cập sau này.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bước 4 */}
                    <div className="p-6">
                        <div className="flex">
                            {/* <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
                                    4
                                </div>
                            </div> */}
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Ứng tuyển và theo dõi trạng thái
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Sau khi tìm được công việc phù hợp, hãy thực
                                    hiện các bước sau:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-4">
                                    <li>
                                        Nhấp vào nút{" "}
                                        <span className="font-medium">
                                            &quot;Ứng tuyển&quot;
                                        </span>{" "}
                                        trên trang chi tiết công việc.
                                    </li>
                                    <li>
                                        Tải lên CV và thêm thư ứng tuyển (nếu
                                        cần).
                                    </li>
                                    <li>
                                        Theo dõi trạng thái ứng tuyển trong mục
                                        &quot;Quản lý ứng tuyển&quot;.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-lg text-center">
                    Để biết thêm thông tin, hãy quay lại{" "}
                    <Link
                        href="/faq"
                        className="text-gray-600 font-medium underline hover:text-gray-800"
                    >
                        trang FAQ
                    </Link>
                    .
                </p>
            </section>
        </main>
    );
}
