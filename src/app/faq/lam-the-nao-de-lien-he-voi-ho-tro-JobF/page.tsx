// export default function faq_5() {
//     return (
//         <main className="bg-gray-100 p-6">
//             <section className="max-w-6xl mx-auto">
//                 <header className="text-center mb-10">
//                     <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//                         Làm thế nào để liên hệ với bộ phận hỗ trợ của JobF?
//                     </h1>
//                     <p className="text-lg text-gray-600">
//                         Nếu cần trợ giúp, bộ phận hỗ trợ của JobF luôn sẵn sàng
//                         giúp bạn!
//                     </p>
//                 </header>

import Link from "next/link";

//                 <div className="space-y-12">
//                     <div className="flex items-start space-x-6">
//                         <div className="flex-shrink-0">
//                             <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold">
//                                 1
//                             </div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//                                 Sử dụng trang &quot;Liên hệ&quot;
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Bạn có thể truy cập trang &quot;Liên hệ&quot; để
//                                 gửi yêu cầu hỗ trợ trực tiếp:
//                             </p>
//                             <ol className="list-decimal list-inside text-gray-600 space-y-2">
//                                 <li>
//                                     Truy cập vào trang{" "}
//                                     <a
//                                         href="/contact"
//                                         className="text-blue-600  hover:text-blue-800"
//                                     >
//                                         &quot;Liên hệ&quot;
//                                     </a>
//                                     .
//                                 </li>
//                                 <li>
//                                     Điền đầy đủ thông tin vào biểu mẫu liên hệ:
//                                     tên, email và nội dung yêu cầu của bạn.
//                                 </li>
//                                 <li>
//                                     Nhấn nút{" "}
//                                     <span className="font-medium">
//                                         &quot;Gửi&quot;
//                                     </span>
//                                     . Bộ phận hỗ trợ sẽ phản hồi bạn trong vòng
//                                     24 giờ.
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
//                                 Gửi email trực tiếp
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Nếu muốn liên hệ qua email, bạn có thể gửi yêu
//                                 cầu đến địa chỉ:{" "}
//                                 <span className="text-gray-800 font-medium text-lg">
//                                     <a
//                                         href="mailto:support@JobF.com"
//                                         className="text-blue-600 hover:text-blue-800"
//                                     >
//                                         support@JobF.com
//                                     </a>
//                                 </span>
//                             </p>

//                             <p className="text-gray-600 mb-3">
//                                 Khi gửi email, hãy đảm bảo cung cấp thông tin
//                                 chi tiết về vấn đề bạn gặp phải, bao gồm:
//                             </p>
//                             <ul className="list-disc list-inside text-gray-600 space-y-2">
//                                 <li>Họ tên và email đăng nhập của bạn.</li>
//                                 <li>
//                                     Liên kết hoặc mô tả công việc bạn đang xử
//                                     lý.
//                                 </li>
//                                 <li>
//                                     Mô tả chi tiết vấn đề hoặc yêu cầu của bạn.
//                                 </li>
//                                 <li>Ảnh chụp màn hình (nếu có).</li>
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
//                                 Hỗ trợ qua đường dây nóng (Hotline)
//                             </h2>
//                             <p className="text-gray-600 mb-3">
//                                 Bạn cũng có thể gọi trực tiếp đến đường dây nóng
//                                 của chúng tôi:{" "}
//                                 <span className="text-gray-800 font-medium text-lg mb-3">
//                                     0909-123-456
//                                 </span>
//                             </p>

//                             <p className="text-gray-600 mb-3">
//                                 Thời gian hỗ trợ qua hotline:
//                             </p>
//                             <ul className="list-disc list-inside text-gray-600 space-y-2">
//                                 <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
//                                 <li>Thứ Bảy: 9:00 - 12:00</li>
//                                 <li>Chủ Nhật: Nghỉ</li>
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
export default function faq_5() {
    return (
        <main className="bg-gray-100 p-8">
            <section className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Làm thế nào để liên hệ với bộ phận hỗ trợ của JobF?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Nếu cần trợ giúp, bộ phận hỗ trợ của JobF luôn sẵn sàng
                        giúp bạn!
                    </p>
                </header>

                {/* Content Section */}
                <div className="bg-gray-100">
                    <div className="p-6">
                        <div className="flex">
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                                    Sử dụng trang liên hệ
                                </h2>
                                <ol className="list-decimal list-inside text-gray-600 space-y-4">
                                    <li>
                                        Truy cập vào trang{" "}
                                        <Link
                                            href="/contact"
                                            className=" hover:text-gray-800 underline font-bold"
                                        >
                                            liên hệ
                                        </Link>
                                        .
                                    </li>
                                    <li>
                                        Điền đầy đủ thông tin vào biểu mẫu liên
                                        hệ: tên, email và nội dung yêu cầu của
                                        bạn.
                                    </li>
                                    <li>
                                        Nhấn nút &quot;Gửi&quot;. Bộ phận hỗ trợ
                                        sẽ phản hồi bạn trong vòng 24 giờ.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex">
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Gửi email trực tiếp
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Nếu muốn liên hệ qua email, bạn có thể gửi
                                    yêu cầu đến địa chỉ:{" "}
                                    <a
                                        href="mailto:support@JobF.com"
                                        className="hover:text-gray-800 font-bold underline"
                                    >
                                        support@JobF.com
                                    </a>
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Khi gửi email, hãy đảm bảo cung cấp thông
                                    tin chi tiết về vấn đề bạn gặp phải, bao
                                    gồm:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-4">
                                    <li>Họ tên và email đăng nhập của bạn.</li>
                                    <li>
                                        Liên kết hoặc mô tả công việc bạn đang
                                        xử lý.
                                    </li>
                                    <li>
                                        Mô tả chi tiết vấn đề hoặc yêu cầu của
                                        bạn.
                                    </li>
                                    <li>Ảnh chụp màn hình (nếu có).</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex">
                            <div className="w-full">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Hỗ trợ qua đường dây nóng (Hotline)
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Bạn cũng có thể gọi trực tiếp đến đường dây
                                    nóng của chúng tôi:{" "}
                                    <span className="font-bold text-lg">
                                        0909-123-456
                                    </span>
                                </p>
                                <p className="text-gray-600 mb-4">
                                    Thời gian hỗ trợ qua hotline:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-4">
                                    <li>Thứ Hai - Thứ Sáu: 8:00 - 18:00</li>
                                    <li>Thứ Bảy: 9:00 - 12:00</li>
                                    <li>Chủ Nhật: Nghỉ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-lg text-center">
                    Để biết thêm thông tin, hãy quay lại{" "}
                    <Link
                        href="/faq"
                        className="font-medium underline hover:text-gray-800"
                    >
                        trang FAQ
                    </Link>
                    .
                </p>
            </section>
        </main>
    );
}
