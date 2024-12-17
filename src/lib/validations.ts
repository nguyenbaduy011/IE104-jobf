import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, {
    message: "Tên công ty phải có ít nhất 2 ký tự.",
  }),
  employeeNumber: z.coerce.number().int().positive().optional(),
  website: z.string().url(),
  coverImageType: z.enum(["upload", "link"]),
  coverImage: z.string().optional(),
  avatarType: z.enum(["upload", "link"]),
  avatar: z.string().optional().default(""),
  companyModel: z.string(),
  companyIndustry: z.string(),
  country: z.string(),
  workingTime: z.string(),
  introduction: z.string(),
  benefits: z.string(),
  address: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  overtime: z.string(),
  companyArea: z.string(),
});

export type CompanyValues = z.infer<typeof companySchema>;

export const jobSchema = z.object({
  jobCompany: z.string(),
  jobTitle: z
    .string()
    .min(1, { message: "Tên công việc không được bỏ trống." }),
  salary: z.string(),
  requiredSkills: z.string(),
  jobDescription: z
    .string()
    .min(1, { message: "Không được bỏ trống thông tin công việc." }),
  benefits: z.string(),
  workingWay: z.string(),
  jobRequirements: z.string(),
});

export type JobValues = z.infer<typeof jobSchema>;
