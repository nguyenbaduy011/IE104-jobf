export default function faq_1() {
    return (
        <main className=" bg-gray-50 p-8 text-gray-800">
            <div className="flex items-center mx-auto">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-3xl font-semibold text-primary text-center mb-4">
                        JobF là gì?
                    </h1>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700">
                        JobF là một nền tảng tuyển dụng việc làm chuyên nghiệp,
                        được thiết kế dành riêng cho các tài năng IT tại Việt
                        Nam. Với sứ mệnh kết nối các lập trình viên, kỹ sư phần
                        mềm, và các chuyên gia công nghệ với những công ty hàng
                        đầu trong ngành, JobF mang đến một giải pháp tuyển dụng
                        tối ưu cho cả ứng viên và nhà tuyển dụng.
                    </p>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700">
                        JobF cung cấp một hệ sinh thái toàn diện, cho phép các
                        lập trình viên dễ dàng tìm kiếm cơ hội việc làm phù hợp
                        với kỹ năng và mục tiêu nghề nghiệp của mình. Người dùng
                        có thể tạo hồ sơ cá nhân, tải lên CV và theo dõi các
                        công việc mở trên nền tảng. Đặc biệt, ứng viên có thể
                        ứng tuyển chỉ với một cú nhấp chuột và nhận được thông
                        báo ngay khi có những cơ hội việc làm mới phù hợp.
                    </p>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700">
                        Đối với các công ty, JobF là công cụ tuyệt vời để tiếp
                        cận các ứng viên chất lượng, tiết kiệm thời gian và chi
                        phí trong quá trình tuyển dụng. Các nhà tuyển dụng có
                        thể đăng tuyển dụng công việc một cách nhanh chóng và
                        tìm kiếm ứng viên phù hợp dựa trên các bộ lọc về kỹ
                        năng, kinh nghiệm và vị trí địa lý.
                    </p>
                    <p className="text-lg leading-relaxed mb-6 text-gray-700">
                        Bên cạnh đó, JobF cũng hỗ trợ các tính năng quản lý ứng
                        viên và theo dõi quá trình tuyển dụng, giúp các nhà
                        tuyển dụng dễ dàng kết nối với những tài năng công nghệ
                        xuất sắc. Với môi trường làm việc đa dạng, sáng tạo và
                        đầy thử thách, JobF không chỉ giúp bạn tìm kiếm cơ hội
                        nghề nghiệp mà còn mở ra những con đường phát triển lâu
                        dài trong sự nghiệp công nghệ.
                    </p>

                    <p className="mt-8 text-lg text-center">
                        Để biết thêm thông tin, hãy quay lại{" "}
                        <a
                            href="/faq"
                            className="text-primary font-semibold underline hover:text-primary-dark"
                        >
                            trang FAQ
                        </a>
                        .
                    </p>
                </div>
                <div className="lg:w-1/2 mb-8 lg:mb-0 ">
                    <img
                        className="w-2/5 h-2/5 object-contain rounded-lg shadow-lg"
                        src="https://images.unsplash.com/photo-1732496742791-8e3e7ba5c385?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="JobF platform"
                    />
                </div>
            </div>
        </main>
    );
}
