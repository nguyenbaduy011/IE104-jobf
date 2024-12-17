/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteCompany } from "@/lib/action/company/deleteCompany";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export type Company = {
  id: number;
  name: string;
  employeeNumber: number;
  industryName: string;
  country: string;
  slug: string;
};

const HandleClick = ({
  id,
  name,
  slug,
}: {
  id: number;
  name: string;
  slug: string;
}) => {
  return <a href={`/companies/${slug}?id=${id}`}>{name}</a>;
};

const handleEdit = (id: number) => {
  // Implement edit logic here
  console.log(`Edit company with id: ${id}`);
};

const handleDelete = async (id: number) => {
  const router = useRouter();
  try {
    await deleteCompany(id); // Gọi server action
    router.refresh()
    toast({
      title: "Xóa thành công",
      description: "Đã xoá công ty",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    toast({
      title: "Lỗi",
      description: "Có lỗi xảy ra khi xóa công ty",
    });
  }
};
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Tên công ty",
    cell: ({ row }) => {
      const { id, name, slug } = row.original;
      return <HandleClick id={id} name={name} slug={slug} />;
    },
  },
  {
    accessorKey: "industryName",
    header: "Lĩnh vực",
  },
  {
    accessorKey: "employeeNumber",
    header: "Nhân viên",
  },
  {
    accessorKey: "country",
    header: "Quốc gia",
  },
  {
    header: "Hành động",
    cell: ({ row }) => {
      const company = row.original;
      return (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(company.id)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-1" />
                Xoá
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bạn có chắc không?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể được hoàn tác. Thao tác này sẽ xoá
                  vĩnh viễn thông tin của công ty khỏi máy chủ của chúng tôi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(company.id)}>
                  Xoá
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
