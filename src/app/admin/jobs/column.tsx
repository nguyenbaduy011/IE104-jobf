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
import { deleteJob } from "@/lib/action/job/deleteJob";
import { useEffect, useState } from "react";
import EditJobForm from "@/app/admin/jobs/createJob/editJobForm";
export type Job = {
  id: number;
  jobTitle: string;
  companyName: string;
  createdAt: string;
  slug: string;
};

const HandleClick = ({
  id,
  jobTitle,
  slug,
}: {
  id: number;
  jobTitle: string;
  slug: string;
}) => {
  return <a href={`/jobs/${slug}?id=${id}`}>{jobTitle}</a>;
};

const handleDelete = async (id: number) => {
  try {
    await deleteJob(id); // Gọi server action
    toast({
      title: "Xóa thành công",
      description: "Công việc đã được xóa.",
    });
  } catch (error) {
    console.error("Error deleting job:", error);
    toast({
      title: "Lỗi",
      description: "Có lỗi xảy ra khi xóa công ty",
    });
  }
};
export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "jobTitle",
    header: "Tên công việc",
    cell: ({ row }) => {
      const { id, jobTitle, slug } = row.original;
      return <HandleClick id={id} jobTitle={jobTitle} slug={slug} />;
    },
  },
  {
    accessorKey: "companyName",
    header: "Công ty",
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
  },
  {
    header: "Hành động",
    cell: ({ row }) => {
      const job = row.original;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const [data, setData] = useState<any>();

      useEffect(() => {
        async function fetchOneJob() {
          try {
            const response = await fetch("/api/getOneJob", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({ jobID: job.id }),
            });
            if (!response.ok) {
              throw new Error("Lỗi khi lấy công việc");
            }
            const result = await response.json();
            console.log(result);
            setData(result.job);
          } catch (error) {
            console.error(error);
            setData(undefined);
          }
        }
        fetchOneJob();
      }, [job.id]);

      return (
        <div className="flex space-x-2">
          {data && <EditJobForm job={data} />}

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
                  vĩnh viễn thông tin của công việc khỏi máy chủ của chúng tôi.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Huỷ</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(job.id)}>
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
