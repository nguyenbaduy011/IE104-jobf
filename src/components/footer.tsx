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
                <Link
                  href="/faq/jobf-la-gi"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Về JobF
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Việc làm IT
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="font-bold">Điều khoản chung</div>
            <ul>
              <li>
                <Link
                  href="/policy/chinh-sach-quyen-rieng-tu"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Quy định bảo mật
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/quy-che-hoat-dong"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Quy chế hoạt động
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/giai-quyet-khieu-nai"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Giải quyết khiếu nại
                </Link>
              </li>
              <li>
                <Link
                  href="/policy/thoa-thuan-su-dung"
                  className="flex items-center py-2 hover:text-gray-600"
                >
                  Thỏa thuận sử dụng
                </Link>
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
                  Hồ Chí Minh:
                  <Link href={`tel:${+84123456789}`}></Link>(+84) 123456789
                </div>
              </li>
              <li>
                <div className="inline-flex items-center gap-2 py-2">
                  <PhoneCall className="w-4 h-4" />
                  Hà Nội:
                  <Link href={`tel:${+84987654321}`}></Link>(+84) 987654321
                </div>
              </li>
              <li>
                <div className="inline-flex items-center gap-2 py-2">
                  <Mail className="w-4 h-4" />
                  <Link href="mailto:looking@jobf.com">looking@jobf.com</Link>
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
