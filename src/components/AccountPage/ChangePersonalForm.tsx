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
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/lib/database.types"


const formSchema = z.object({
  imie: z.string().min(1, {
    message: "Imie musi być dłuższe niż jeden znak",
  }),
  nazwisko: z.string().min(2, {
    message: "Nazwisko musi być dłuższe niż jeden znak",
  }),
  img: z.string().url({
    message: "Niepoprawny adres url",
  }),
})
  


export function ChangePersonalForm() {

  const supabase = createClientComponentClient<Database>()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imie: "",
      nazwisko: ""
    },
  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    //to do
    
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-3/4 ">
        <FormField
          control={form.control}
          name="imie"
          render={({ field }) => (
            <FormItem className="h-24">
              <FormLabel>Imie</FormLabel>
              <FormControl>
                <Input placeholder="Krzysiek" className="text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nazwisko"
          render={({ field }) => (
            <FormItem className="h-24">
              <FormLabel>Nazwisko</FormLabel>
              <FormControl>
                <Input placeholder="Godyń"  className="text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="img"
          render={({ field }) => (
            <FormItem className="h-24">
              <FormLabel>Adres URL zdjęcia</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/verti1234.png"  className="text-black" {...field} />
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
