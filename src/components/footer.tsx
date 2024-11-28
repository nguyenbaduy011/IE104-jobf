import { Github, Linkedin, Mail, PhoneCall, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary-foreground">
      <div className="h-[400px] flex items-center justify-center text-black">
        <div className="flex gap-20">
          <div className="space-y-4 font-bold flex flex-col items-center">
            <div>JobF</div>
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
            <div>
              <Link href="/">
                <div>Trang chủ</div>
              </Link>
              <div>Về JobF</div>
              <div>Việc làm IT</div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold">Liên hệ:</div>
            <div className="inline-flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <div>Hồ Chí Minh: (+84) 123456789</div>
            </div>
            <div className="inline-flex items-center gap-2">
              <PhoneCall className="w-4 h-4" />
              <div>Hà Nội: (+84) 987654321</div>
            </div>
            <div className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <div>looking@jobf.com</div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-white py-6 text-center text-sm">
        &copy; {new Date().getFullYear()} JobF. All rights
        reserved.
      </div>
    </footer>
  );
}
