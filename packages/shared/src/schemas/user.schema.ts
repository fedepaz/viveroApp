// shared/src/schemas/user.schema.ts

import { z } from "zod";

export const UpdateUserProfileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

export type UpdateUserProfileDto = z.infer<typeof UpdateUserProfileSchema>;
