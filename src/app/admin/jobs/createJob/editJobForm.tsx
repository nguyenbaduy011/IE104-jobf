"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { jobSchema, JobValues } from "@/lib/validations";
import { toast } from "@/hooks/use-toast";
import { SelectCompanyType } from "@/drizzle/schema/schema";
import { editJob } from "@/lib/action/job/editJob";
import LoadingButton from "@/components/ui/loadingButton";
import RichTextEditor from "@/components/richText/richTextEditor";
import { DialogDescription } from "@radix-ui/react-dialog";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditJobForm({ job }: { job: any }) {
  const [companies, setCompanies] = useState<SelectCompanyType[]>([]);

  const form = useForm<JobValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobCompany: job?.company.name,
      jobTitle: job?.jobTitle,
      salary: job?.salary,
      requiredSkills: job?.requiredSkills,
      jobDescription: job?.jobDescription,
      benefits: job?.benefits,
      workingWay: job?.workingWay,
      jobRequirements: job?.jobRequirements,
    },
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch("/api/getCompany");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu công ty");
        }
        const result = await response.json();
        setCompanies(Array.isArray(result.company) ? result.company : []);
      } catch (error) {
        console.error(error);
        setCompanies([]);
      }
    }
    fetchCompanies();
  }, []);

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: JobValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    try {
      await editJob(formData, job.id);
      toast({
        title: "Thành công",
        description: "Sửa thông tin công việc thành công",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Lỗi",
        description: "Sửa thông tin công việc không thành công",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4 mr-1" />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin công việc</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết để tạo công việc.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Thông tin cơ bản */}

              <Tabs defaultValue="basic">
                <TabsList>
                  <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                  <TabsTrigger value="details">Chi tiết công việc</TabsTrigger>
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
                              <SelectValue placeholder="Chọn lĩnh vực công ty" />
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
                <TabsContent value="details">
                  <ScrollArea className="h-[350px]">
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
                              initialContent={field.value}
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
                              initialContent={field.value}
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
                              initialContent={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      return "/jobs";
                    }}
                  >
                    Huỷ
                  </Button>
                  <DialogClose asChild>
                    <LoadingButton
                      type="submit"
                      className="w-full"
                      loading={isSubmitting}
                    >
                      Sửa
                    </LoadingButton>
                  </DialogClose>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
