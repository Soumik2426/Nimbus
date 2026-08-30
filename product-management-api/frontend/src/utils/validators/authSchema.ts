import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required"),

  lastName: z
    .string()
    .min(1, "Last name is required"),

  email: z
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(
      /[^A-Za-z0-9]/,
      "Must contain a special character"
    ),
});

export type RegisterFormData =
  z.infer<typeof registerSchema>;