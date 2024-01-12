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
import { LoginDataValidator } from "@/lib/validators/LoginData"



export function ChangePassForm() {
  const supabase = createClientComponentClient<Database>()

  const form = useForm<z.infer<typeof LoginDataValidator>>({
    resolver: zodResolver(LoginDataValidator),
    defaultValues: {
      email: "",
      password: "", 
      confirmPassword: "",
    },
  })

  const handleChange = async (password: string, email:string) => {
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: password
    })    
    if (error) {
      toast.error("Coś poszło nie tak", {
          description: "Spróbuj ponownie później",
      })}
    else {
      toast.success("Dane zostały pomyślnie zaktualizowane")
    }
  }


  function onSubmit(values: z.infer<typeof LoginDataValidator>) {
    handleChange(values.password, values.email)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zmień adres E-mail</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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
