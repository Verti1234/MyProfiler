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
import { toast } from "sonner"
import { LoginDataValidator } from "@/lib/validators/LoginData"
import { useSession } from "next-auth/react"

export function ChangePassForm() {

  const { data: session,update } = useSession();
  
  const form = useForm<z.infer<typeof LoginDataValidator>>({
    resolver: zodResolver(LoginDataValidator),
    defaultValues: {
      email: session?.user?.email || "",
      password: "", 
      confirmPassword: "",
    },
  })


  async function onSubmit(values: z.infer<typeof LoginDataValidator>) {

    
    const body = {
      email: values.email,
      password: values.password,
      session: session
    }
    
    
    try {
      const res = await fetch('/api/changelogindata', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      }
      );
      
      toast.success("Zmieniono dane Logowania")
      update()
    } 
    catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd. Spróbuj ponownie później")
    }
    
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
        <div className="flex justify-center">
          <Button type="submit" >
            Wprowadź zmiany
            </Button>
        </div>
      </form>
    </Form>
  )
}
