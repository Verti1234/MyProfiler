import { z } from "zod";


export const LoginDataValidator = z.object({
  email: z.string().email({
    message: "Niepoprawny adres email",
  }),
  password: z.string().min(8, {
    message: "Hasło musi być dłuższe niż 8 znaków",
  }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Hasła nie są takie same",
  path: ['confirmPassword'],
})