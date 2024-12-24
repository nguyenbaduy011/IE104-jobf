/* eslint-disable @next/next/no-img-element */
import React from "react";

const AboutUs = () => {
  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-10 text-center">
        <h1 className="text-4xl font-bold md:text-6xl">Về chúng tôi, JobF</h1>
        <p className="mt-4 text-lg md:text-xl">
          Kết nối tài năng công nghệ thông tin hàng đầu với những công ty tốt
          nhất tại Việt Nam.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-8 md:px-20 lg:px-32 bg-white">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Giá trị cốt lõi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Khách hàng là ưu tiên hàng đầu",
              description:
                "Chúng tôi đặt khách hàng vào trung tâm của mọi việc mình làm để mang lại trải nghiệm tốt nhất có thể.",
            },
            {
              title: "Sự đổi mới",
              description:
                "Chúng tôi nỗ lực tạo ra những giải pháp sáng tạo để giúp kết nối tài năng công nghệ thông tin và các công ty.",
            },
            {
              title: "Chính trực",
              description:
                "Chúng tôi hoạt động với sự minh bạch, trung thực và công bằng trong tất cả các giao dịch của mình.",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <h3 className="text-xl font-medium text-primary">
                {value.title}
              </h3>
              <p className="mt-2 text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-8 md:px-20 lg:px-32 bg-gray-100">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Our Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-semibold text-primary mb-4">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg text-gray-600">
              Sứ mệnh của chúng tôi là kết nối những tài năng công nghệ thông
              tin xuất sắc với các công ty đánh giá cao kỹ năng của họ, giúp họ
              phát triển và thành công trong sự nghiệp.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Chúng tôi cam kết trao quyền cho các chuyên gia công nghệ thông
              tin bằng cách cung cấp cơ hội, tài nguyên và hướng dẫn để họ xuất
              sắc trong ngành công nghệ.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-8 md:px-20 lg:px-32 bg-white">
        <h2 className="text-3xl font-semibold text-center text-primary mb-8">
          Gặp gỡ đội ngũ của chúng tôi
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "DuyNguyen",
              role: "CTO",
              img: "https://via.placeholder.com/150",
            },
            {
              name: "KhangPham",
              role: "COO",
              img: "https://via.placeholder.com/150",
            },
            {
              name: "KhaiLe",
              role: "CEO",
              img: "https://via.placeholder.com/150",
            },
            {
              name: "DuyLe",
              role: "CTO",
              img: "https://via.placeholder.com/150",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-medium text-primary">
                {member.name}
              </h3>
              <p className="mt-2 text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
