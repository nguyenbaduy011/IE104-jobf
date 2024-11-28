import { pgTable, text } from "drizzle-orm/pg-core";

export const city = pgTable("city", {
  id: text("id").primaryKey(),
  cityName: text("cityName").notNull(),
});
