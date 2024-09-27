import { z } from "zod";

export const CommentSchema = z.object({
  comment: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 10, {
      message: "Minimum 10 symbols",
    })
    .refine((value) => !value || value.length <= 200, {
      message: "Maximum 200 symbols",
    }),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
