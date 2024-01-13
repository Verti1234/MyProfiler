import { z } from "zod";


export const SignInValidator = z.object({
  email: z.string().email({
    message: "Wpisz poprawny adres email",
  }).min(2, {
    message: "Login musi być dłuższy niż 2 znaki",
  }),
  password: z.string()
})
