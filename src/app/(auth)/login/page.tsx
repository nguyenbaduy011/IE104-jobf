"use client";
import { Input } from "@/components/ui/input";
import { client } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z.string().nonempty({ message: "Mật khẩu không được để trống" }),
});

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (values: z.infer<typeof formSchema>) => {
    await client.signIn.email(
      { ...values, callbackURL: "/" },
      {
        onError(ctx) {
          toast({
            variant: "destructive",
            title: "Đăng nhập thất bại",
            description: ctx.error.message,
            action: <ToastAction altText="Try again">Thử lại</ToastAction>,
          });
        },
        onSuccess() {
          toast({
            title: "Đăng nhập thành công",
          });
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

  return (
    <section className="py-40 px-20 flex gap-16">
      <div className=" w-2/3 flex justify-center">
        <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
          Đăng nhập
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px]">
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
                      <Input placeholder="m@example.com" {...field} />
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
                      <Input {...field} type="password" />
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
                Đăng nhập
              </LoadingButton>
            </form>
          </Form>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={handleGoogle}
          >
            Đăng nhập với Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="underline">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
