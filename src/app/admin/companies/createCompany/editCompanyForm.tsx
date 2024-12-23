"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone, FileWithPath, FileRejection } from "react-dropzone";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Upload, Link, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { companySchema, CompanyValues } from "@/lib/validations";
import { toast } from "@/hooks/use-toast";
import { SelectAreaType, SelectIndustryType } from "@/drizzle/schema/schema";
import { SelectGroup } from "@radix-ui/react-select";
import { upload } from "@vercel/blob/client";
import RichTextEditor from "@/components/richText/richTextEditor";
import LoadingButton from "@/components/ui/loadingButton";
import { editCompany } from "@/lib/action/company/editCompany";
// import { editCompany } from "@/lib/action/company/editCompany";

interface ImageDropzoneProps {
  onDrop: (acceptedFiles: FileWithPath[]) => void;
  acceptedFiles: readonly FileWithPath[];
  fileRejections: readonly FileRejection[];
  getRootProps: () => React.HTMLAttributes<HTMLDivElement>;
  getInputProps: () => React.InputHTMLAttributes<HTMLInputElement>;
  isDragActive: boolean;
  file: File | null;
  onRemove: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditCompanyForm({ company }: { company: any }) {
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  //useState lấy lĩnh vực
  const [industries, setIndustries] = useState<SelectIndustryType[]>([]);

  //useState lấy khu vực
  const [areas, setAreas] = useState<SelectAreaType[]>([]);

  const form = useForm<CompanyValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name,
      employeeNumber: company?.employeeNumber,
      website: company?.website,
      coverImageType: "link",
      coverImage: company?.coverImage || "",
      avatarType: "link",
      avatar: company?.avatar,
      companyModel: company?.companyModel,
      companyIndustry: company?.industry?.name || "",
      country: company?.country,
      workingTime: company?.workingTime || "",
      introduction: company?.introduction || "",
      benefits: company?.benefits || "",
      address: company?.address,
      email: company?.email,
      phoneNumber: company?.phoneNumber,
      overtime: company?.overtime,
      companyArea: company?.area!.name,
    },
  });

  const onDrop =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setter(file);
        form.setValue(
          setter === setCoverImageFile ? "coverImage" : "avatar",
          URL.createObjectURL(file)
        );
      }
    };

  const {
    getRootProps: getCoverRootProps,
    getInputProps: getCoverInputProps,
    isDragActive: isCoverDragActive,
    acceptedFiles: coverAcceptedFiles,
    fileRejections: coverFileRejections,
  } = useDropzone({
    onDrop: onDrop(setCoverImageFile),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    maxFiles: 1,
  });

  const {
    getRootProps: getAvatarRootProps,
    getInputProps: getAvatarInputProps,
    isDragActive: isAvatarDragActive,
    acceptedFiles: avatarAcceptedFiles,
    fileRejections: avatarFileRejections,
  } = useDropzone({
    onDrop: onDrop(setAvatarFile),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    maxFiles: 1,
  });

  useEffect(() => {
    async function fetchIndustries() {
      try {
        const response = await fetch("/api/getIndustry");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu lĩnh vực");
        }
        const result = await response.json();
        setIndustries(Array.isArray(result.industry) ? result.industry : []);
      } catch (error) {
        console.error(error);
        setIndustries([]);
      }
    }
    fetchIndustries();
  }, []);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const response = await fetch("/api/getArea");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu khu vực");
        }
        const result = await response.json();
        setAreas(Array.isArray(result.area) ? result.area : []);
      } catch (error) {
        console.error(error);
        setAreas([]);
      }
    }
    fetchAreas();
  }, []);

  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CompanyValues) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        if (key === "coverImage" && coverImageFile) {
          formData.append(key, coverImageFile);
        } else if (key === "avatar" && avatarFile) {
          formData.append(key, avatarFile);
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (coverImageFile) {
      try {
        const newBlob = await upload(coverImageFile.name, coverImageFile, {
          access: "public",
          handleUploadUrl: "/api/upload-to-vercel-blob",
        });
        if (newBlob) {
          formData.append("coverImage", newBlob.url);
        }
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }

    if (avatarFile) {
      try {
        const newBlob = await upload(avatarFile.name, avatarFile, {
          access: "public",
          handleUploadUrl: "/api/upload-to-vercel-blob",
        });

        if (newBlob) {
          formData.append("avatar", newBlob.url);
        }
      } catch (error) {
        console.error("Error uploading avatar image:", error);
      }
    }

    try {
      await editCompany(formData, company.id);
      toast({
        title: "Thành công",
        description: "Sửa thông tin công ty thành công",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Lỗi",
        description: "Sửa thông tin công ty không thành công",
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
          <DialogTitle>Chỉnh sửa thông tin công ty</DialogTitle>
          <DialogDescription>
            Điền thông tin chi tiết để tạo hồ sơ công ty của bạn.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-between h-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Thông tin cơ bản */}
              <Tabs defaultValue="basic">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
                  <TabsTrigger value="details">Chi tiết công ty</TabsTrigger>
                  <TabsTrigger value="contact">Thông tin liên lạc</TabsTrigger>
                </TabsList>
                {/* Thông tin cơ bản */}
                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Tên công ty*
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên công ty" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeeNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          Số lượng nhân viên*
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 1000"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.valueAsNumber;
                              field.onChange(
                                value === 0
                                  ? 0
                                  : isNaN(value)
                                  ? undefined
                                  : value
                              );
                            }}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://www.example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyIndustry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Lĩnh vực</FormLabel>
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
                              {industries.map((industry) => (
                                <SelectItem
                                  key={industry.id}
                                  value={industry.name}
                                >
                                  {industry.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                {/* Chi tiết công ty */}
                <TabsContent value="details" className="space-y-4">
                  <ScrollArea className="h-[350px]">
                    <FormField
                      control={form.control}
                      name="coverImageType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-bold">Ảnh bìa</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem
                                  value="upload"
                                  id="coverImageUpload"
                                />
                                <Label htmlFor="coverImageUpload">
                                  Tải lên hình ảnh
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem
                                  value="link"
                                  id="coverImageLink"
                                />
                                <Label htmlFor="coverImageLink">
                                  Đường dẫn hình ảnh
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coverImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            {form.watch("coverImageType") === "upload" ? (
                              <ImageDropzone
                                onDrop={onDrop(setCoverImageFile)}
                                acceptedFiles={coverAcceptedFiles}
                                fileRejections={coverFileRejections}
                                getRootProps={getCoverRootProps}
                                getInputProps={getCoverInputProps}
                                isDragActive={isCoverDragActive}
                                file={coverImageFile}
                                onRemove={() => {
                                  setCoverImageFile(null);
                                  form.setValue("coverImage", "");
                                }}
                              />
                            ) : (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Enter cover image URL"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                >
                                  <Link className="h-4 w-4" />
                                  <span className="sr-only">Lấy hình ảnh</span>
                                </Button>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="avatarType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-bold">
                            Ảnh đại diện
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem
                                  value="upload"
                                  id="avatarUpload"
                                />
                                <Label htmlFor="avatarUpload">
                                  Tải lên hình ảnh
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem value="link" id="avatarLink" />
                                <Label htmlFor="avatarLink">
                                  Đường dẫn hình ảnh
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="avatar"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            {form.watch("avatarType") === "upload" ? (
                              <ImageDropzone
                                onDrop={onDrop(setAvatarFile)}
                                acceptedFiles={avatarAcceptedFiles}
                                fileRejections={avatarFileRejections}
                                getRootProps={getAvatarRootProps}
                                getInputProps={getAvatarInputProps}
                                isDragActive={isAvatarDragActive}
                                file={avatarFile}
                                onRemove={() => {
                                  setAvatarFile(null);
                                  form.setValue("avatar", "");
                                }}
                              />
                            ) : (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Enter avatar image URL"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                >
                                  <Link className="h-4 w-4" />
                                  <span className="sr-only">Lấy hình ảnh</span>
                                </Button>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Mô hình công ty
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. B2B, B2C, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="introduction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Giới thiệu công ty
                          </FormLabel>
                          <FormControl>
                            {/* <Textarea
                              placeholder="Mô tả công ty của bạn, bao gồm lịch sử, thành tích, đối tác và văn hóa."
                              className="h-32"
                              {...field}
                            /> */}
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
                {/* Thông tin liên lạc */}
                <TabsContent value="contact" className="space-y-4">
                  <ScrollArea className="h-[350px]">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Quốc gia</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Việt Nam" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Địa chỉ</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập địa chỉ công ty"
                              {...field}
                            />
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
                          <FormLabel className="font-bold">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="contact@company.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Số điện thoại
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="+1234567890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">
                            Thời gian làm việc
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Thứ 2 - Thứ 6, 9 AM - 5 PM"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="overtime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Tăng ca</FormLabel>
                          <FormControl>
                            <Input placeholder="Có trợ cấp" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold">Khu vực</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn khu vực" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {areas.map((area) => (
                                <SelectItem key={area.id} value={area.name}>
                                  {area.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                      return "/companies";
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

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  // onDrop,
  // acceptedFiles,
  fileRejections,
  getRootProps,
  getInputProps,
  isDragActive,
  file,
  onRemove,
}) => (
  <div
    {...getRootProps()}
    className={cn(
      "border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors",
      isDragActive
        ? "border-primary bg-primary/10"
        : "border-gray-300 hover:border-primary"
    )}
  >
    <input {...getInputProps()} />
    {file ? (
      <div className="flex items-center justify-between">
        <span className="text-sm">{file.name}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    ) : (
      <div className="space-y-2">
        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          {isDragActive
            ? "Drop the file here"
            : "Drag 'n' drop an image here, or click to select"}
        </p>
      </div>
    )}
    {fileRejections.length > 0 && (
      <p className="text-red-500 text-sm mt-2">
        Please upload a valid image file (PNG, JPG, JPEG, GIF)
      </p>
    )}
  </div>
);
