/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SelectJobType, SelectCompanyType } from "@/drizzle/schema/schema";
import { Briefcase, MapPin, Building, Code, Clock } from "lucide-react";
import Link from "next/link";

interface JobCardProps {
  job: SelectJobType & { company: SelectCompanyType | null };
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow hover:shadow-lg transition-shadow p-4 flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <img
          src={job.company?.avatar || "https://via.placeholder.com/60x60"}
          alt={`${job.company?.name || "Company"} logo`}
          className="w-[60px] h-[60px] bg-gray-300 rounded-md object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {job.jobTitle}
          </h2>
          <h3 className="text-sm text-gray-500 truncate flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {job.company?.name || "Unknown Company"}
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{job.company?.address || "Location not specified"}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          <span>{job.salary || "Thỏa thuận"}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Code className="w-4 h-4 mr-2" />
          <span>{job.requiredSkills || "Không có thông tin"}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{job.workingWay || "Không có thông tin"}</span>
        </div>
      </div>

      <div className="mt-2">
        <Link href={`/jobs/${job.slug}?id=${job.id}`}>
          <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
            Xem chi tiết
          </button>
        </Link>
      </div>
    </div>
  );
}
