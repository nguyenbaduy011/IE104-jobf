"use client";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/components/ui/icons";

const formSchema = z.object({
  email: z.string().email({
    message: "Vui lòng nhập một địa chỉ email hợp lệ.",
  }),
  password: z.string().nonempty({ message: "Mật khẩu không được để trống." }),
});

export default function SignIn() {
  const data = client.useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    await client.signIn.email(
      { ...values, rememberMe: rememberUser },
      {
        onError(ctx) {
          if (ctx.error.status === 403) {
            toast({
              variant: "destructive",
              title: "Đăng nhập thất bại, vui lòng xác nhận địa chỉ email",
              description: "Địa chỉ email chưa được xác nhận",
              action: (
                <ToastAction
                  altText="Try again"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Thử lại
                </ToastAction>
              ),
            });
            router.push("/verify");
            router.refresh();
          } else {
            toast({
              variant: "destructive",
              title: "Đăng nhập thất bại",
              description: "Mật khẩu hoặc tài khoản không khớp",
              action: (
                <ToastAction
                  altText="Try again"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Thử lại
                </ToastAction>
              ),
            });
          }
        },
        onSuccess() {
          toast({
            title: "Đăng nhập thành công",
          });
          router.push("/");
          router.refresh();
        },
        onRequest() {
          setIsLoading(true);
        },
        onResponse() {
          setIsLoading(false);
        },
      }
    );
  };

  const handleGoogle = async () => {
    await client.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  useEffect(() => {
    if (data.data?.session) {
      router.push("/"); // Chuyển hướng về trang chính nếu có session
    }
  }, [data.data?.session, router]);
  return (
    <section className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Đăng nhập
          </CardTitle>
          {/* <CardDescription className="text-center">
            Nhập thông tin đăng nhập của bạn để truy cập tài khoản
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignIn)}
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <Label>Mật khẩu</Label>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input {...field} type="password" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={rememberUser}
                    onChange={(e) => setRememberUser(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <LoadingButton
                className="w-full"
                type="submit"
                loading={isLoading}
              >
                Đăng nhập
              </LoadingButton>
            </form>
          </Form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Hoặc tiếp tục với
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogle}>
            <Icons.google className="mr-2 h-4 w-4" />
            Đăng nhập với Google
          </Button>
        </CardContent>
        <CardFooter>
          <div className="text-center text-sm text-muted-foreground w-full">
            Chưa có tài khoản?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary hover:underline"
            >
              Đăng ký
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
