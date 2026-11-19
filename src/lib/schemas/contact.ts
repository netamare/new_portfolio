import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(1).max(3000),
});
