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
import { toast } from "sonner"
import { PersonalDataValidator } from "@/lib/validators/PersonalData"





export function ChangePersonalForm() {

  const supabase = createClientComponentClient<Database>()
  
  const form = useForm<z.infer<typeof PersonalDataValidator>>({
    resolver: zodResolver(PersonalDataValidator),
    defaultValues: {
      imie: "",
      nazwisko: ""
    },
  })

  const handleUpdate = async (imie:string,nazwisko: string) => {
        const {data: { session } } = await supabase.auth.getSession(); 
      const { data, error } = await supabase
      .from('Users')
      .update({ firstname: imie, surname: nazwisko })
      .eq('id', session?.user.id)

      
      if(error){
        toast.error("Coś poszło nie tak", {
          description: "Spróbuj ponownie później",
      })
      }else{
        const { error } = await supabase.auth.refreshSession()
        toast.success("Dane zostały pomyślnie zaktualizowane")
      }
    
  }

  async function onSubmit(values: z.infer<typeof PersonalDataValidator>) {
    
    handleUpdate(values.imie,values.nazwisko)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
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
          <Button type="submit">Wprowadź zmiany</Button>
        
        
      </form>
    </Form>
  )
}
