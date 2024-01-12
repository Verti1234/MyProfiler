import { z } from "zod";

export const PersonalDataValidator = z.object({
  imie: z.string().min(1, {
    message: "Imie musi być dłuższe niż jeden znak",
  }),
  nazwisko: z.string().min(2, {
    message: "Nazwisko musi być dłuższe niż jeden znak",
  }),
})
  