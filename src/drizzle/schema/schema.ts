import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const company = pgTable("company", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Tên công ty
  employeeNumber: integer("employeeNumber").notNull(), // Số lượng nhân viên
  website: text("website").notNull(), // Link web công ty
  coverImage: text("coverImage"), // Ảnh bìa công ty
  avatar: text("avatar").notNull(), // Ảnh đại diện công ty
  companyModel: text("companyModel").notNull(), // Mô hình công ty
  industryID: text("industryID")
    .notNull()
    .references(() => industry.id, { onDelete: "cascade" }), // Lĩnh vực công ty
  country: text("country").notNull(), // Quốc gia
  workingTime: text("workingTime"), // Thời gian làm việc
  introduction: text("introduction"), // Giới thiệu công ty
  benefits: text("benefits"), // Quyền lợi
  address: text("address").notNull(), // Địa chỉ
  email: text("email").notNull(), // Gmail
  phoneNumber: text("phoneNumber").notNull(), // Số điện thoại
  overtime: text("overtime").notNull(), // Làm việc ngoài giờ
  areaID: text("areaID")
    .notNull()
    .references(() => area.id, { onDelete: "cascade" }), // Khu vực công ty
  slug: varchar("slug", { length: 250 }).notNull(),
});

export type InsertCompanyType = typeof company.$inferInsert;
export type SelectCompanyType = typeof company.$inferSelect;

export const job = pgTable("job", {
  id: serial("id").primaryKey(), // Sử dụng serial để đồng nhất kiểu dữ liệu
  companyID: integer("companyID")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }), // Đồng bộ kiểu dữ liệu
  jobTitle: text("jobTitle").notNull(), // Tên việc làm
  salary: text("salary"), // Lương
  requiredSkills: text("requiredSkills").notNull(), // Kỹ năng yêu cầu
  jobDescription: text("jobDescription").notNull(), // Mô tả công việc
  benefits: text("benefits").notNull(), // Quyền lợi công việc
  createdAt: timestamp("created_at").defaultNow().notNull(), // Thời gian tạo
  workingWay: text("workingWay").notNull(),
  jobRequirements: text("jobRequirements").notNull(),
  slug: varchar("slug", { length: 250 }).notNull(),
});

export type InsertJobType = typeof job.$inferInsert;
export type SelectJobType = typeof job.$inferSelect;

export const area = pgTable("area", {
  id: text("id").primaryKey(), // Mã khu vực
  name: text("name").notNull(), // Tên khu vực
});
export type InsertAreaType = typeof area.$inferInsert;
export type SelectAreaType = typeof area.$inferSelect;

export const industry = pgTable("industry", {
  id: text("id").primaryKey(), // Mã lĩnh vực
  name: text("name").notNull(), // Tên lĩnh vực
});
export type InsertIndustryType = typeof industry.$inferInsert;
export type SelectIndustryType = typeof industry.$inferSelect;

// relations

export const companyRelations = relations(company, ({many, one }) => ({
  industry: one(industry, {
    fields: [company.industryID],
    references: [industry.id],
  }),
  area: one(area, {
    fields: [company.areaID],
    references: [area.id],
  }),
  jobs: many(job)
}));

export const industryRelations = relations(industry, ({ many }) => ({
  companies: many(company),
}));

export const areaRelations = relations(area, ({ many }) => ({
  companies: many(company),
}));

export const jobRelations = relations(job, ({ one }) => ({
  company: one(company, {
    fields: [job.companyID],
    references: [company.id],
  }),
}));