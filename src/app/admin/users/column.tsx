/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
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
import { deleteUser } from "@/lib/action/user/deleteUser";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const HandleClick = ({ id, name }: { id: string; name: string }) => {
  return <a href={`/user?id=${id}`}>{name}</a>;
};

const handleDelete = async (id: string) => {
  try {
    await deleteUser(id); // Gọi server action
    toast({
      title: "Xóa người dùng",
      description: "Đã xoá người dùng.",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    toast({
      title: "Lỗi",
      description: "Có lỗi xảy ra khi xóa người dùng",
    });
  }
};
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Tên người dùng",
    cell: ({ row }) => {
      const { id, name } = row.original;
      return <HandleClick id={id} name={name} />;
    },
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
  },
  {
    header: "Hành động",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex space-x-2">
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
                  vĩnh viễn thông tin của người dùng khỏi máy chủ của chúng tôi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(user.id)}>
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
