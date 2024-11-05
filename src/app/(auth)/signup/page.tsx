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

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Tên người dùng phải có ít nhất 2 ký tự",
    })
    .max(30, {
      message: "Tên người dùng không được vượt quá 30 ký tự",
    }),
  email: z.string().email({
    message: "Email không hợp lệ",
  }),
  password: z
    .string()
    .min(8, {
      message: "Mật khẩu phải có ít nhất 8 ký tự",
    })
    .max(20, {
      message: "Mật khẩu không được vượt quá 20 ký tự",
    }),
});

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    await client.signUp.email(
      { ...values, callbackURL: "/" },
      {
        onError(ctx) {
          toast({
            variant: "destructive",
            title: "Đăng ký thất bại",
            description: ctx.error.message,
            action: <ToastAction altText="Try again">Thử lại</ToastAction>,
          });
        },
        onSuccess() {
          toast({
            title: "Đăng ký thành công",
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

  return (
    <section className="py-40 px-20 flex gap-16">
      <div className=" w-2/3 flex justify-center">
        <h2 className="font-medium tracking-tight text-6xl/tight mt-7">
          Đăng ký
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[350px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label>Tên người dùng</Label>
                    <FormControl>
                      <Input placeholder="abc12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                Đăng ký
              </LoadingButton>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Đã có tài khoản?{" "}
            <Link href="/login" className="underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
