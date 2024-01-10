
import TopBar from '@/components/AccountPage/TopBar'
import React from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Database } from '@/lib/database.types';
import DataLoginTab from '@/components/AccountPage/DataLoginTab';
import DataPersonalTab from '@/components/AccountPage/DataPersonalTab';



export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  //test
  console.log(session);
  //endtest
  if (!session) {
    redirect("/");
  }
  return (
    <div className='w-full h-screen'>
      <TopBar /> 
      <div className='w-full  h-[calc(100%-6rem)] flex justify-center items-center'>
        <Tabs defaultValue="account" className="w-3/6 h-5/6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Dane logowania</TabsTrigger>
            <TabsTrigger value="password"> Dane osobowe</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="h-5/6">
            <DataLoginTab />
          </TabsContent>
          <TabsContent value="password" className="h-5/6">
            <DataPersonalTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
