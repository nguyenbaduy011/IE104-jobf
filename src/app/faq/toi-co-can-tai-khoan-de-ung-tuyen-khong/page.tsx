export default function faq_3() {
    return (
        <main className="bg-gray-100 p-8">
            <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                {/* Header Section */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Tôi có cần tài khoản để ứng tuyển không?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Câu trả lời là{" "}
                        <span className="font-bold text-blue-600">Có</span>.
                    </p>
                </header>

                {/* Content Section */}
                <div className="space-y-10">
                    {/* Phần giải thích lý do */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Vì sao cần tài khoản trên JobF?
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Việc tạo tài khoản là bước đầu tiên và quan trọng để
                            bạn có thể sử dụng tối đa các tính năng của JobF.
                            Dưới đây là những lợi ích chính mà tài khoản mang
                            lại:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>
                                <strong>Ứng tuyển dễ dàng:</strong> Chỉ với một
                                cú nhấp chuột, bạn có thể gửi hồ sơ trực tiếp
                                đến nhà tuyển dụng.
                            </li>
                            <li>
                                <strong>Theo dõi trạng thái:</strong> Kiểm tra
                                trạng thái hồ sơ của bạn - đã xem, đang xử lý,
                                hay được mời phỏng vấn.
                            </li>
                            <li>
                                <strong>Nhận thông báo:</strong> Nhận thông tin
                                về các công việc phù hợp với kỹ năng và kinh
                                nghiệm của bạn.
                            </li>
                            <li>
                                <strong>Quản lý hồ sơ:</strong> Lưu trữ nhiều CV
                                để lựa chọn dễ dàng khi ứng tuyển.
                            </li>
                        </ul>
                    </section>

                    {/* Phần hướng dẫn tạo tài khoản */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Hướng dẫn tạo tài khoản trên JobF
                        </h2>
                        <ol className="list-decimal list-inside text-gray-600 space-y-2">
                            <li>
                                Truy cập trang chủ JobF tại{" "}
                                <a href="#" className="text-blue-600 underline">
                                    www.jobf.com
                                </a>{" "}
                                và nhấp vào nút{" "}
                                <strong>&quot;Đăng ký&quot;</strong>.
                            </li>
                            <li>
                                Điền thông tin cần thiết, bao gồm email, mật
                                khẩu và số điện thoại.
                            </li>
                            <li>
                                Xác nhận email bằng cách nhấp vào liên kết trong
                                email xác nhận từ JobF.
                            </li>
                            <li>
                                Đăng nhập và hoàn thiện hồ sơ cá nhân: thêm
                                thông tin liên hệ, ảnh đại diện và một đoạn giới
                                thiệu ngắn về bản thân.
                            </li>
                        </ol>
                    </section>

                    {/* Câu hỏi thường gặp */}
                    <section>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Câu hỏi thường gặp
                        </h2>
                        <div className="bg-gray-100 p-4 rounded-lg mb-4">
                            <p className="text-gray-700 font-medium">
                                <strong>Q:</strong> Tôi có thể ứng tuyển mà
                                không có tài khoản không?
                            </p>
                            <p className="text-gray-700">
                                <strong>A:</strong> Không, JobF yêu cầu bạn tạo
                                tài khoản để đảm bảo thông tin được quản lý chặt
                                chẽ, đồng thời giúp bạn theo dõi tiến độ ứng
                                tuyển và nhận thông báo phù hợp.
                            </p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <p className="text-gray-700 font-medium">
                                <strong>Q:</strong> Tôi có thể sử dụng một tài
                                khoản để ứng tuyển nhiều công việc không?
                            </p>
                            <p className="text-gray-700">
                                <strong>A:</strong> Có, bạn có thể sử dụng tài
                                khoản của mình để ứng tuyển nhiều công việc khác
                                nhau, đồng thời quản lý từng hồ sơ ứng tuyển
                                riêng biệt.
                            </p>
                        </div>
                    </section>
                </div>

                <p className="mt-8 text-lg text-center">
                    Để biết thêm thông tin, hãy quay lại{" "}
                    <a
                        href="/faq"
                        className="text-blue-600 font-medium underline hover:text-blue-800"
                    >
                        trang FAQ
                    </a>
                    .
                </p>
            </section>
        </main>
    );
}
