import { Context, Env } from "hono";
import { z, ZodError } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be 20 characters or less"),
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be 50 characters or less"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      (value) => {
        return (
          /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value)
        );
      },
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      },
    ),
});

export const signInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const onBoardSchema = z.object({
    picture: z.string().optional(),
    email: z.string().optional(),
    department: z.string().optional(),
    hobbies: z.string().optional(),
})

export const zSchemaError = (
    result:
      | { success: true; data: Object }
      | { success: false; error: ZodError<any>; data: Object },
    c: Context<Env, string, {}>,
  ) => {
    if (!result.success) {
      return c.json(
        {
          success: false,
          message: result.error.issues
            .map((i) => i.path.join(", ") + ": " + i.message)
            .join(","),
          meta: { issues: result.error.issues },
        },
        400,
      );
    }
  };

export const PostChatSchema = z.object({
    chat: z.string()
})