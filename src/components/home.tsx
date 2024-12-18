"use client";

import { Button } from "@/components/ui/button";
import { ComboboxDemo } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { JobCard } from "@/components/jobCard";
import { useState, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  SelectAreaType,
  SelectJobType,
  SelectCompanyType,
} from "@/drizzle/schema/schema";
import Chatbot from "./chatbot";

export function Home({
  jobs,
  areas,
}: {
  jobs: (SelectJobType & { company: SelectCompanyType | null })[];
  areas: SelectAreaType[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobPerPage = 9;

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = !selectedArea || job.company?.areaID === selectedArea;
      return matchesSearch && matchesArea;
    });
  }, [jobs, searchTerm, selectedArea]);

  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobPerPage);

  const startIndex = (currentPage - 1) * jobPerPage;
  const endIndex = startIndex + jobPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId === "" ? null : areaId);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      {/* Header */}
      <Chatbot/>
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 flex flex-col gap-4 h-[300px] justify-center px-4">
          <h1 className="text-2xl font-bold">Việc làm tốt nhất</h1>

          {/* Search Bar */}
          <div className="w-full mx-auto h-14 bg-white rounded-full flex items-center justify-center gap-3 p-3 border">
            <Input
              className="w-full md:w-[600px] rounded-full"
              placeholder="Vị trí tuyển dụng, tên công ty"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ComboboxDemo areas={areas} onValueChange={handleAreaChange} />
            <div className="hidden md:block border border-r-1 h-8"></div>
            <Button className="bg-primary rounded-full" onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              <span className="hidden md:inline">Tìm kiếm</span>
            </Button>
          </div>

          {/* Filter Tags */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {["Tất Cả", "Hà Nội", "Hồ Chí Minh", "Đà Nẵng"].map(
              (tag, index) => (
                <Button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    (index === 0 && !selectedArea) ||
                    areas.find((area) => area.name === tag)?.id === selectedArea
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    handleAreaChange(
                      index === 0
                        ? ""
                        : areas.find((area) => area.name === tag)?.id || ""
                    )
                  }
                >
                  {tag}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        {currentJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có công việc nào!</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
                onClick={() => {
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>

            <PaginationItem>
              <div className="text-sm font-medium px-4 py-2">
                Trang {currentPage} / {totalPages}
              </div>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
                onClick={() => {
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

