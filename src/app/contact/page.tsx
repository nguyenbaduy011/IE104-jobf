import React from 'react'

export default function page() {
  return (
    <section className="py-20 px-10 bg-gray-100">
      <div className='max-w-4xl mx-auto bg-white p-10 shadow-lg rounded-lg'>
        <h1 className="text-4xl font-bold py-5">Liên hệ</h1>
        <h2 className="text-3xl font-bold py-3">Địa chỉ văn phòng</h2>
        <p className="text-lg mb-4">Thủ Đức, Thành phố Hồ Chí Minh</p>
        <h2 className="text-3xl font-bold py-3">Dành cho nhà tuyển dụng</h2>
        <ul className="list-disc list-inside text-lg marker:text-red-500">
          <li>
            Hãy gọi ngay cho đội ngũ Tuyển Chọn của chúng tôi
            <ul className="list-disc list-inside ml-5">
              <li><strong>HCM:</strong> +84 666 666 666</li>
              <li><strong>Hà Nội:</strong> +84 777 777 777</li>
            </ul>
          </li>
          <li>Hãy để lại thông tin để được chúng tôi liên hệ tư vấn ngay</li>
        </ul>
        <p className="text-lg mb-2 py-3">Chúng tôi sẵn sàng để giúp bạn phát triển</p>
        <h2 className="text-3xl font-bold py-3">Dành cho ứng viên</h2>
        <ul className="list-disc list-inside text-lg marker:text-red-500">
          <li>Đặt câu hỏi trên Facebook JobF</li>
          <li>Đọc các bài blog của chúng tôi về bí quyết viết CV và kỹ năng phỏng vấn</li>
          <li>Gọi chúng tôi theo số +84 69 6969 6999</li>
        </ul>
      </div>
    </section>
  )
}
