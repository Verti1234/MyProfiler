"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useSession,signOut } from "next-auth/react";
import UserInfo from "./UserInfo";



type user = {
  firstName: string,
  SurName: string,
  email: string,
  image: string
}


export default function TopBar() {
  const { data: session } = useSession();
  
  const [user, setUser] = useState<user>();

  const fetchData = useCallback(async () => {
    const body = {
      session: session
    }
    const res = await fetch('/api/getuser', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const account = await res.json();
    setUser(account)

  }, [session]);
  
  useEffect(() => {
    fetchData()
  },[session,fetchData])

  


  return (
    <div className='w-full h-24 flex justify-center    '>
      <div className=' w-[95%] h-full flex justify-between items-center  border-b-[1px] p-4' >
        <h1 className='text-3xl font-light flex justify-center items-center gap-2'><UserRound size={32}/>MyProfiler</h1>
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className='flex justify-center items-center gap-3 hover:bg-neutral-200 rounded-lg px-2 py-1 transition-all cursor-pointer'>
              <span className='text-lg'>{user?.firstName} {user?.SurName}</span>
              <Avatar>
                <AvatarImage src={`${user?.image}`} />
                <AvatarFallback>E4</AvatarFallback>
              </Avatar>
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
              <Link href={'/'} onClick={() => signOut()}>
                Wyloguj się
              </Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="pb-4">Aktualne dane</DialogTitle>
            <DialogDescription>
              <UserInfo user={user} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>  
    </div>
  )
}
