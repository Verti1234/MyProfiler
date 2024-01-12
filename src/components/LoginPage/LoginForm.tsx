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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/lib/database.types"
import { toast } from "sonner"
import { SignInValidator } from "@/lib/validators/SignIn"



export function LoginForm() {

  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInValidator>>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      login: "",
      password: ""
    },
  })

  const handleSignIn = async (login:string,password: string) => {
      await supabase.auth.signInWithPassword({
        email:login,
        password:password,
        
  })
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  if(session){
    // console.log(session);
    router.push('/account')
  }else{
    toast.error("Nie udało się zalogować", {
          description: "Błędne dane logowania",
        },
        )
  }
}

  async function onSubmit(values: z.infer<typeof SignInValidator>) {
    handleSignIn(values.login,values.password)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-3/4 ">
        <FormField
          control={form.control}
          name="login"
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
