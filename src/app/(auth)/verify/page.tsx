"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { client } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const data = client.useSession();
  const user = data.data?.user;
  const router = useRouter();

  useEffect(() => {
    if (user?.emailVerified) {
      router.push("/"); // Chuyển hướng về trang chính
    }
  }, [user, router]);

  useEffect(() => {
    if (data.data?.session) {
      router.push("/"); // Chuyển hướng về trang chính nếu có session
    }
  }, [data.data?.session, router]);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await client.sendVerificationEmail({
        email: email,
      });
      toast({
        title: "Gửi email xác nhận thành công!",
      });
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast({
        variant: "destructive",
        title: "Gửi email xác nhận thất bại",
        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleProceedToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Xác minh email của bạn</CardTitle>
          <CardDescription>
            Chúng tôi đã gửi mail xác minh đến địa chỉ mail của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <div className="animate-pulse w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          </div>
          <p className="text-center">
            Vui lòng kiểm tra hộp thư và nhấp vào đường dẫn xác minh để hoàn
            thành thủ tục đăng ký.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Nếu bạn vẫn chưa thấy mail, vui lòng kiểm tra hộp thư rác
          </p>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Nhập lại địa chỉ email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-full"
              onClick={handleResendVerification}
              disabled={isResending || !email}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang gửi...
                </>
              ) : (
                "Gửi lại email xác minh"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleProceedToLogin}
          >
            Quay lại trang đăng nhập
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
