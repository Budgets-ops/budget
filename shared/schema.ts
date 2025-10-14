import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface Service {
  id: string;
  name: string;
  logo: string;
  category: 'telecom' | 'utility';
}

export interface Package {
  id: string;
  serviceId: string;
  name: string;
  dataAmount: string;
  price: number;
  validity: string;
}

export interface Order {
  id: string;
  serviceId: string;
  packageId: string;
  recipientNumber: string;
  paymentNumber: string;
  paymentNetwork: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
}

export const orderSchema = z.object({
  serviceId: z.string().min(1),
  packageId: z.string().min(1),
  recipientNumber: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
  paymentNumber: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
  paymentNetwork: z.string().min(1),
});

export type InsertOrder = z.infer<typeof orderSchema>;
