"use client"
import React, {  Suspense, useEffect, useState } from 'react'
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link';


import { useRouter } from 'next/navigation';


import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type User = {
  id: string;
  firstname: string;
  surname: string;
  image: string;
}

export default  function TopBar() {
  
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  
  
useEffect(() => {
  const fetchData = async () => {
    let { data: Users, error } = await supabase
      .from('Users')
      .select('*')
    if (Users && Users.length > 0) {
      setUser(Users[0]);
    }
  }
  fetchData();
}, [supabase]);

console.log(user);

  return (
    <div className='w-full h-24 flex justify-center    '>
      <div className=' w-[95%] h-full flex justify-between items-center  border-b-[1px] p-4' >
        <h1 className='text-3xl font-light flex justify-center items-center gap-2'><UserRound size={32}/>MyProfiler</h1>
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            
              <div className='flex justify-center items-center gap-3 hover:bg-neutral-200 rounded-lg px-2 py-1 transition-all cursor-pointer'>
                <Suspense fallback={<p>Loading...</p>}>
                  <span className='text-lg'>{user?.firstname+" "+user?.surname }</span>
                  <Avatar>
                    <AvatarImage src={`${user?.image}`} />
                    <AvatarFallback>E4</AvatarFallback>
                  </Avatar>
                </Suspense>
              </div>
            
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger className='w-full'>
            <DropdownMenuItem className="cursor-pointer">
                O tobie
            </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className=" text-red-500 hover:text-red-700 cursor-pointer">
              <Link href={'/'} onClick={handleSignOut}>
                Wyloguj się
              </Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aktualne dane</DialogTitle>
            <DialogDescription className='flex flex-col'>
              {/* Login: {session?.user.email} */}
              <span>Imię: {user?.firstname}</span>
              <span>Nazwisko: {user?.surname}</span>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>  
    </div>
  )
}
