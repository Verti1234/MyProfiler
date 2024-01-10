"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/lib/database.types"
import { toast } from "sonner"
import { useEffect, useState } from "react"

const formSchema = z.object({
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

export function ChangePassForm() {
  const supabase = createClientComponentClient<Database>()
  const [defaultEmail, setDefaultEmail] = useState("")
  
  // console.log(defaultEmail);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: defaultEmail,
      password: "", 
      confirmPassword: "",
    },
  })

  useEffect(() => {
  const getEmail = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setDefaultEmail(session?.user.email || "");
  }
  getEmail()
  }, [])

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      email: defaultEmail,
    });
  }, [defaultEmail]);
  const handleChange = async (password: string, email:string) => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password
    })
    console.log(data);
    
    if (error) {
      console.log(error);
      
      toast("Operacja nieudana", {
          description: "Wystąpił błąd podczas aktualizacji danych logowania",
          action: {
            label: "X",
            onClick: () => console.log("Test"),
          }
        },
        )
    } else {
      toast("Operacja udana", {
          description: "Pomyślnie zaktualizowano dane logowania",
          action: {
            label: "X",
            onClick: () => console.log("Test"),
          }
        },
        )
      }
  }


  function onSubmit(values: z.infer<typeof formSchema>) {
    handleChange(values.password, values.email)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zmień adres E-mail</FormLabel>
              <FormControl>
                <Input placeholder={`${defaultEmail}`} {...field} />
              </FormControl>
              <FormDescription>
                
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zmień hasło</FormLabel>
              <FormControl>
                <Input placeholder="je11y22fi$h" {...field} />
              </FormControl>
              <FormDescription>
                Wprowadź nowe hasło. Pamiętaj, żeby było ono bezpieczne i nie podawaj go nikomu.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Powtórz hasło</FormLabel>
              <FormControl>
                <Input placeholder="•••••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Wprowadź zmiany</Button>
      </form>
    </Form>
  )
}
