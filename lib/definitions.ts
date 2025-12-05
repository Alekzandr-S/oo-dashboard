import * as z from 'zod';

export const SigninFormSchema = z.object({
  email: z.email({error: "Please enter a valid email."}),
  password: z
    .string()
    .min(8, {error: "Password should be at least 8 characters long."})
    .trim(),
})

export type FormState = 
| {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined