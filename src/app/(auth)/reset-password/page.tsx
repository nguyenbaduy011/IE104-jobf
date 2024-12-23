"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loadingButton";
import { ToastAction } from "@/components/ui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useState } from "react";
import { client } from "@/lib/auth-client";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .regex(/[A-Z]/, { message: "Mật khẩu phải chứa ít nhất một chữ hoa" })
      .regex(/[a-z]/, { message: "Mật khẩu phải chứa ít nhất một chữ thường" })
      .regex(/[0-9]/, { message: "Mật khẩu phải chứa ít nhất một số" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) {
      toast({
        variant: "destructive",
        title: "Liên kết không hợp lệ",
        description: "Vui lòng yêu cầu đặt lại mật khẩu mới.",
      });
      router.push("/forgot-password");
      return;
    }

    setIsLoading(true);
    try {
      await client.resetPassword({
        newPassword: `${values.confirmPassword}`,
      });

      toast({
        title: "Mật khẩu đã được đặt lại",
        description: "Bạn có thể đăng nhập bằng mật khẩu mới.",
      });

      router.push("/login");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra",
        description: "Không thể đặt lại mật khẩu. Vui lòng thử lại sau.",
        action: (
          <ToastAction altText="Try again" onClick={() => form.reset()}>
            Thử lại
          </ToastAction>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Đặt lại mật khẩu
          </CardTitle>
          <CardDescription className="text-center">
            Nhập mật khẩu mới cho tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Mật khẩu mới</Label>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="password" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label>Xác nhận mật khẩu</Label>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="password" {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton
                className="w-full"
                type="submit"
                loading={isLoading}
              >
                Đặt lại mật khẩu
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
