import { z } from "zod";

// Shared parameter validation schema
export const numericIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, "ID must be a numeric string."),
  }),
});

// Post creation schema with strict fields (rejects any extra objects/fields)
export const createUserSchema = z.object({
  body: z
    .object({
      name: z
        .string({ message: "Name is required." })
        .min(2, "Name must be at least 2 characters long.")
        .max(100, "Name must not exceed 100 characters."),
      email: z
        .email("Please provide a valid email address.")
        .max(200, "Email must not exceed 200 characters."),
    })
    .strict(),
});

// Put update schema inheriting strictness and making fields optional
export const updateUserSchema = z.object({
  params: numericIdSchema.shape.params,
  body: createUserSchema.shape.body
    .partial()
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided for update.",
    }),
});
