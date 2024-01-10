"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/lib/database.types"
import { toast } from "sonner"


const formSchema = z.object({
  login: z.string().min(2, {
    message: "Login musi być dłuższy niż 2 znaki",
  }),
  password: z.string()
// popraw na sonner czy cos
})

export function LoginForm() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
    console.log(session);
    router.push('/account')
  }else{
    console.log('nie zalogowano');
    toast("Nie udało się zalogować", {
          description: "Błędne dane logowania",
          action: {
            label: "X",
            onClick: () => console.log("Test"),
          }
        },
        )
  }
}
  // email: "krzysztofgodyn501@gmail.com",
  // password: "jelly22fish",

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
          <Button type="submit">Zaloguj się</Button>
        </div>
        
      </form>
    </Form>
  )
}
