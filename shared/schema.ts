import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobPostings = pgTable("job_postings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  ministry: text("ministry").notNull(),
  department: text("department").notNull(),
  jobType: text("job_type").notNull(),
  employmentType: text("employment_type").notNull(),
  location: text("location").notNull(),
  positions: integer("positions").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  preferredQualifications: text("preferred_qualifications"),
  applicationPeriodStart: timestamp("application_period_start").notNull(),
  applicationPeriodEnd: timestamp("application_period_end").notNull(),
  contact: text("contact").notNull(),
  originalUrl: text("original_url").notNull(),
  pdfUrl: text("pdf_url"),
  isUrgent: boolean("is_urgent").default(false),
  isNew: boolean("is_new").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
  updatedAt: timestamp("updated_at").default(sql`now()`),
});

export const ministryUrls = pgTable("ministry_urls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  url: text("url").notNull(),
  isActive: boolean("is_active").default(true),
  lastChecked: timestamp("last_checked"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertJobPostingSchema = createInsertSchema(jobPostings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMinistryUrlSchema = createInsertSchema(ministryUrls).omit({
  id: true,
  createdAt: true,
});

export type InsertJobPosting = z.infer<typeof insertJobPostingSchema>;
export type JobPosting = typeof jobPostings.$inferSelect;
export type InsertMinistryUrl = z.infer<typeof insertMinistryUrlSchema>;
export type MinistryUrl = typeof ministryUrls.$inferSelect;

export const searchJobsSchema = z.object({
  query: z.string().optional(),
  ministry: z.string().optional(),
  jobType: z.string().optional(),
  employmentType: z.string().optional(),
  sortBy: z.enum(["latest", "deadline", "ministry"]).default("latest"),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type SearchJobsQuery = z.infer<typeof searchJobsSchema>;
