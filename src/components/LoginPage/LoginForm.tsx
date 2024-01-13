"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { SignInValidator } from "@/lib/validators/SignIn"
import { signIn } from "next-auth/react"


export function LoginForm() {

  const router = useRouter()

  const form = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: "",
      password: ""
    },
  })



  async function onSubmit(values: z.infer<typeof SignInValidator>) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      // callbackUrl: "/profile",
      redirect: false,
    })
    if (res?.error) {
      toast.error("Niepoprawne dane logowania")
    } else {
      router.push("/account")
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-3/4 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-24">
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder="Krzysiek" className="text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="h-24">
              <FormLabel>Hasło</FormLabel>
              <FormControl>
                <Input placeholder="jelly22fish" type="password" className="text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          <Button type="submit" >
            Zaloguj się
            </Button>
        </div>
        
      </form>
    </Form>
  )
}
