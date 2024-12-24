"use client";

import { Github, Linkedin, Mail, PhoneCall, Youtube, Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/nguyenbaduy011/jobf",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Youtube,
    href: "https://youtube.com",
    label: "YouTube",
  },
];

const aboutLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Về JobF" },
  { href: "/", label: "Việc làm IT" },
  { href: "/faq", label: "Câu hỏi thường gặp" },
];

const policyLinks = [
  { href: "/policy/chinh-sach-quyen-rieng-tu", label: "Quy định bảo mật" },
  { href: "/policy/quy-che-hoat-dong", label: "Quy chế hoạt động" },
  { href: "/policy/giai-quyet-khieu-nai", label: "Giải quyết khiếu nại" },
  { href: "/policy/thoa-thuan-su-dung", label: "Thỏa thuận sử dụng" },
];

const contactInfo = [
  {
    icon: PhoneCall,
    label: "Hồ Chí Minh",
    value: "(+84) 123456789",
    href: "tel:+84123456789",
  },
  {
    icon: PhoneCall,
    label: "Hà Nội",
    value: "(+84) 987654321",
    href: "tel:+84987654321",
  },
  {
    icon: Mail,
    label: "Email",
    value: "looking@jobf.com",
    href: "mailto:looking@jobf.com",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      // Add your newsletter subscription logic here
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      toast({
        title: "Đăng ký thành công!",
        description: "Cảm ơn bạn đã đăng ký nhận bản tin của JobF.",
      });
      setEmail("");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Đăng ký thất bại",
        description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-primary-foreground border-t">
      <div className="container mx-auto px-4">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social Links */}
          <div className="lg:col-span-1 space-y-6">
            <Link
              href="/"
              className="inline-block font-bold text-2xl hover:text-primary transition-colors"
            >
              <Image src="/jobf.svg" alt="JobF logo" width={200} height={200} />
            </Link>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Nền tảng tuyển dụng IT hàng đầu tại Việt Nam
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* About Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Về JobF</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Điều khoản chung</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              {contactInfo.map((info) => (
                <li key={info.label}>
                  <Link
                    href={info.href}
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <info.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>
                      {info.label}:{" "}
                      <span className="font-medium">{info.value}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-4">Đăng ký nhận tin</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Nhận thông tin về việc làm mới và các xu hướng trong ngành IT
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pr-12"
                />
                <Button
                  size="sm"
                  type="submit"
                  disabled={isSubscribing}
                  className={cn(
                    "absolute right-1 top-1 h-7",
                    isSubscribing && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Đăng ký</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} JobF. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
