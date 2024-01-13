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
import { toast } from "sonner"
import { PersonalDataValidator } from "@/lib/validators/PersonalData"
import { useSession } from 'next-auth/react';


export function ChangePersonalForm() {

  const { data: session, update} = useSession();

  
  const form = useForm<z.infer<typeof PersonalDataValidator>>({
    resolver: zodResolver(PersonalDataValidator),
    defaultValues: {
      imie: '',
      nazwisko: ''
    },
  })

  async function onSubmit(values: z.infer<typeof PersonalDataValidator>) {
    
    const body = {
      imie: values.imie,
      nazwisko: values.nazwisko,
      session: session
    }
    try {
      const response = await fetch('/api/changepersonaldata', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      }
      );

      
      toast.success("Zmieniono dane osobowe")
      update()
    } catch (error) {
      console.error(error);
      toast.error("Wystąpił błąd. Spróbuj ponownie później")
    }

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
                <Input placeholder="John" className="text-black" {...field} />
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
                <Input placeholder="Doe"  className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button type="submit" >Wprowadź zmiany</Button>
        </div>
          
        
        
      </form>
    </Form>
  )
}
