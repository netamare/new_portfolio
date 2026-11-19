import "server-only";

import { z } from "zod";

const serverEnvSchema = z.object({
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

export function getServerEnv() {
  return serverEnvSchema.parse({ MONGODB_URI: process.env.MONGODB_URI });
}
