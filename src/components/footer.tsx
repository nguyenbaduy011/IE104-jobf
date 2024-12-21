import { Github, Linkedin, Mail, PhoneCall, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary-foreground">
            <div className="h-[300px] flex py-16 justify-center text-black">
                <div className="flex gap-16">
                    <div className="space-y-4 font-bold flex flex-col items-center">
                        <div className="font-bold">JobF</div>
                        <div className="gap-4 flex">
                            <Link href="https://github.com/nguyenbaduy011/jobf">
                                <Github />
                            </Link>
                            <Linkedin />
                            <Youtube />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-bold">Về JobF</div>
                        <ul className="">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Về JobF
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Việc làm IT
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold">Điều khoản chung</div>
                        <ul>
                            <li>
                                <a
                                    href="../policy/chinh-sach-quyen-rieng-tu"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Quy định bảo mật
                                </a>
                            </li>
                            <li>
                                <a
                                    href="../policy/quy-che-hoat-dong"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Quy chế hoạt động
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Giải quyết khiếu nại
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center py-2 hover:text-gray-600"
                                >
                                    Thỏa thuận sử dụng
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <div className="font-bold">Liên hệ</div>
                        <ul>
                            <li>
                                <div className="inline-flex items-center gap-2 py-2">
                                    {" "}
                                    <PhoneCall className="w-4 h-4" />
                                    Hồ Chí Minh: (+84) 123456789
                                </div>
                            </li>
                            <li>
                                <div className="inline-flex items-center gap-2 py-2">
                                    <PhoneCall className="w-4 h-4" />
                                    Hà Nội: (+84) 987654321
                                </div>
                            </li>
                            <li>
                                <div className="inline-flex items-center gap-2 py-2">
                                    <Mail className="w-4 h-4" />
                                    looking@jobf.com
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-primary text-white py-6 text-center text-sm">
                &copy; {new Date().getFullYear()} JobF. All rights reserved.
            </div>
        </footer>
    );
}
