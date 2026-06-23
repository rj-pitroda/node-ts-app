import { z } from "zod";
import { createFileSchema } from "../../utils/fileValidation.ts";

export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .email("Please provide a valid email address.")
        .max(200, "Email must not exceed 200 characters.")
        .toLowerCase(),
      password: z
        .string("Password is required.")
        .min(8, "Password must be at least 8 characters long.")
        .max(15, "Password must not exceed 15 characters."),
    })
    .strict(),
});

export const signUpSchema = z.object({
  body: loginSchema.shape.body.extend({
    name: z
      .string("Name is required")
      .trim()
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name must be at most 100 characters long")
      .transform((name) => name.trim()),
  }),
  files: z.object({
    profileImage: createFileSchema(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z
    .object({
      email: loginSchema.shape.body.shape.email,
    })
    .strict(),
});

export const resetPasswordSchema = z.object({
  body: z
    .object({
      token: z.string({ message: "Token is required." }),
      password: loginSchema.shape.body.shape.password,
    })
    .strict(),
});

export type TLoginSchema = z.infer<typeof loginSchema.shape.body>;
export type TSignUpSchema = z.infer<typeof signUpSchema.shape.body>;
export type TForgotPasswordSchema = z.infer<
  typeof forgotPasswordSchema.shape.body
>;
export type TResetPasswordSchema = z.infer<
  typeof resetPasswordSchema.shape.body
>;
