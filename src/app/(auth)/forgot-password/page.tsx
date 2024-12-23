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
// import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { client } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
});

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  //   const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await client.forgetPassword({
        email: `${values.email}`,
        redirectTo: "/reset-password",
      });

      toast({
        title: "Yêu cầu đặt lại mật khẩu đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để tiếp tục.",
      });

      // router.push('/forgot-password/confirmation')
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra",
        description:
          "Không thể gửi yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.",
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
            Quên mật khẩu
          </CardTitle>
          <CardDescription className="text-center">
            Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>Email</Label>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          className="pl-10"
                        />
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
                Gửi hướng dẫn đặt lại
              </LoadingButton>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link
            href="/login"
            className="w-full flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại đăng nhập
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
