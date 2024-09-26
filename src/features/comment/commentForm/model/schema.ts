import { z } from "zod";

export const CommentSchema = z.object({
  comment: z
    .string()
    .min(1, { message: "Min 200" })
    .max(200, { message: "Max 200" }),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
