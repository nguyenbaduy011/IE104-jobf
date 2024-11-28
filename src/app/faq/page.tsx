"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link từ Next.js

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "1. JobF là gì?",
            answer: "JobF là nền tảng kết nối các tài năng IT hàng đầu với những công ty tốt nhất tại Việt Nam. Chúng tôi giúp các lập trình viên tìm kiếm cơ hội việc làm và hỗ trợ các công ty tuyển dụng nhân tài công nghệ giỏi nhất.",
            link: "/faq/jobf-la-gi",
        },
        {
            question: "2. Làm thế nào để tôi ứng tuyển trên JobF?",
            answer: "Để ứng tuyển trên JobF, bạn chỉ cần tạo tài khoản, tìm kiếm danh sách việc làm và ứng tuyển trực tiếp qua nền tảng của chúng tôi. Bạn có thể tải lên CV, ứng tuyển chỉ với một cú nhấp chuột và theo dõi trạng thái ứng tuyển của mình.",
            link: "/faq/lam-the-nao-de-toi-ung-tuyen-tren-jobf",
        },
        {
            question: "3. Tôi có cần tài khoản để ứng tuyển không?",
            answer: "Có, việc tạo tài khoản trên JobF cho phép bạn ứng tuyển công việc, theo dõi trạng thái ứng tuyển và nhận thông báo về các công việc mới được đăng.",
            link: "/faq/toi-co-can-tai-khoan-de-ung-tuyen-khong",
        },
        {
            question: "4. Làm thế nào để cập nhật hồ sơ của tôi?",
            answer: "Bạn có thể cập nhật hồ sơ bằng cách đăng nhập vào tài khoản JobF, vào mục 'Hồ sơ' và thực hiện các thay đổi cần thiết về thông tin và CV của mình.",
            link: "/faq/lam-the-nao-de-cap-nhat-ho-so-cua-toi",
        },
        {
            question: "5. Làm thế nào để liên hệ với bộ phận hỗ trợ của JobF?",
            answer: "Nếu cần trợ giúp, bạn có thể liên hệ bộ phận hỗ trợ của JobF qua trang 'Liên hệ' hoặc gửi email đến địa chỉ support@JobF.com.",
            link: "/faq/lam-the-nao-de-lien-he-voi-ho-tro-JobF",
        },
    ];

    return (
        <main className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="bg-primary text-white py-20 px-10 text-center">
                <h1 className="text-4xl font-bold md:text-6xl">
                    Frequently Asked Questions
                </h1>
                <p className="mt-4 text-lg md:text-xl">
                    Find answers to the most common questions about JobF.
                </p>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-8 md:px-20 lg:px-32 bg-white">
                <h2 className="text-3xl font-semibold text-center text-primary mb-8">
                    Common Questions
                </h2>
                <div className="space-y-6 w-[1000px] mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-b pb-4">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleAnswer(index)}
                            >
                                <h3 className="text-xl font-medium text-primary">
                                    {faq.question}
                                </h3>
                                <span
                                    className={`transition-transform duration-300 ${
                                        openIndex === index ? "rotate-180" : ""
                                    }`}
                                >
                                    &#9660; {/* Down arrow icon */}
                                </span>
                            </div>
                            {openIndex === index && (
                                <div>
                                    <p className="mt-4 text-lg text-gray-600">
                                        {faq.answer}
                                    </p>
                                    <Link
                                        href={faq.link}
                                        className="text-primary underline mt-2 block"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default FAQ;
