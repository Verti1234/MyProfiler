import { z } from "zod";


export const SignInValidator = z.object({
  login: z.string().min(2, {
    message: "Login musi być dłuższy niż 2 znaki",
  }),
  password: z.string()
})
