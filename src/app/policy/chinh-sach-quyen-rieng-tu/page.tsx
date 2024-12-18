export default function PrivacyPolicy() {
    return (
        <div className="bg-gray-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg py-4 px-8">
                <header className="text-left">
                    <p className="text-base text-gray-400 mb-6 italic">
                        Ngày cập nhật: 20/07/2023
                        <br />
                        Ngày xuất bản: 06/01/2014
                    </p>
                    <h1 className="text-3xl font-bold text-gray-600 mb-6 text-center">
                        Quy định bảo mật
                    </h1>
                </header>

                <main>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        1. Mục đích bảo mật
                    </h2>
                    {/* <h3 className="text-lg font-medium text-gray-700 leading-8 mb-2">
                        Đối với người dùng cá nhân
                    </h3> */}
                    <div className="text-gray-600 leading-8 mb-3">
                        <p>
                            JobF cam kết bảo vệ thông tin cá nhân của người
                            dùng. Chúng tôi áp dụng các biện pháp bảo mật cơ bản
                            để đảm bảo dữ liệu không bị rò rỉ hoặc sử dụng sai
                            mục đích.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        2. Thu thập và sử dụng dữ liệu
                    </h2>
                    <div className="text-gray-600 leading-8 mb-3">
                        <p>
                            Chúng tôi chỉ thu thập thông tin cần thiết cho việc
                            tạo tài khoản và sử dụng các dịch vụ trên JobF, bao
                            gồm tên, email, số điện thoại và thông tin liên quan
                            đến hồ sơ tìm việc.
                        </p>
                        <p>
                            Thông tin này chỉ được sử dụng trong nội bộ website
                            và không được chia sẻ với bên thứ ba nếu không có sự
                            đồng ý từ người dùng.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        3. Lưu trữ thông tin
                    </h2>
                    <div className="text-gray-600 leading-8 mb-3">
                        <p>
                            Dữ liệu của người dùng sẽ được lưu trữ trên cơ sở dữ
                            liệu có bảo mật cơ bản.
                        </p>
                        <p>
                            Chúng tôi sử dụng các biện pháp như mã hóa mật khẩu
                            và hạn chế quyền truy cập vào cơ sở dữ liệu.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        4. Quyền của người dùng
                    </h2>
                    <div className="text-gray-600 leading-8 mb-3">
                        <p>
                            Người dùng có quyền xem, chỉnh sửa, hoặc xóa thông
                            tin cá nhân bất kỳ lúc nào.
                        </p>
                        <p>
                            Người dùng cũng có quyền yêu cầu chúng tôi xóa toàn
                            bộ tài khoản và dữ liệu liên quan.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        5. Giới hạn trách nhiệm
                    </h2>
                    <div className="text-gray-600 leading-8 mb-3">
                        <p>
                            Do nguồn lực sinh viên có hạn, chúng tôi không thể
                            đảm bảo bảo mật tuyệt đối cho dữ liệu.
                        </p>
                        <p>
                            Trong trường hợp xảy ra sự cố bảo mật, chúng tôi sẽ
                            thông báo kịp thời và đưa ra các biện pháp khắc
                            phục.
                        </p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        6. Liên hệ hỗ trợ
                    </h2>
                    <div className="text-gray-600 leading-8 mb-2">
                        <p>
                            Nếu có bất kỳ câu hỏi hoặc yêu cầu nào về quyền
                            riêng tư, người dùng có thể liên hệ qua email:
                            support@jobf.com.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}
