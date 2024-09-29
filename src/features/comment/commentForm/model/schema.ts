import { z } from "zod";

export const CommentSchema = z.object({
  comment: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 10, {
      message: "Minimum 10 symbols",
    })
    .refine((value) => !value || value.length <= 100, {
      message: "Maximum 100 symbols",
    }),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
