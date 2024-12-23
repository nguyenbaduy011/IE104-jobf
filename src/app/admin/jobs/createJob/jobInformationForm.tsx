"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { jobSchema, JobValues } from "@/lib/validations";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { addJob } from "@/lib/action/job/addJob";
import { SelectCompanyType } from "@/drizzle/schema/schema";
import RichTextEditor from "@/components/richText/richTextEditor";
import { Textarea } from "@/components/ui/textarea";

export default function JobInformationForm({
  companies,
}: {
  companies: SelectCompanyType[];
}) {
  const router = useRouter();

  const form = useForm<JobValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobCompany: "",
      jobTitle: "",
      salary: "",
      requiredSkills: "",
      jobDescription: "",
      benefits: "",
      workingWay: "",
      jobRequirements: "",
    },
  });

  async function onSubmit(values: JobValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      await addJob(formData);

      toast({
        title: "Tạo thông tin công việc thành công",
        description: "Thông tin công việc của bạn đã được tạo.",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Lỗi khi tạo thông tin công việc",
        description:
          "Đã có lỗi xảy ra khi tạo thông tin công việc. Vui lòng kiểm tra lại thông tin và thử lại.",
      });
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Tạo thông tin công việc</CardTitle>
            <CardDescription>
              Điền thông tin chi tiết để tạo công việc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Thông tin cơ bản */}
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                    <TabsTrigger value="details">
                      Chi tiết công việc
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="jobCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Công ty</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn công ty" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {companies.map((company) => (
                                  <SelectItem
                                    key={company.id}
                                    value={company.name}
                                  >
                                    {company.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Tiêu đề công việc
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tiêu đề công việc"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Lương</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập lương hoặc khoảng lương"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workingWay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Hình thức làm việc
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập hình thức làm việc"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="details" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="requiredSkills"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Kỹ năng yêu cầu
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Liệt kê ra các kỹ năng được yêu cầu"
                              className="h-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Mô tả công việc
                          </FormLabel>
                          <FormControl>
                            <RichTextEditor
                              onChange={field.onChange}
                              placeholder="Cung cấp mô tả cụ thể hơn về công việc"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Yêu cầu công việc
                          </FormLabel>
                          <FormControl>
                            <RichTextEditor
                              onChange={field.onChange}
                              placeholder="Cung cấp yêu cầu cụ thể hơn về công việc"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="benefits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Phúc lợi</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              onChange={field.onChange}
                              placeholder="Liệt kê các phúc lợi của công việc"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Huỷ
                  </Button>
                  <Button type="submit">Tạo việc làm</Button>
                </div>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              <Info className="h-4 w-4 inline-block mr-1" />
              Các phần đánh dấu * là phần được yêu cầu.
            </p>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
}
