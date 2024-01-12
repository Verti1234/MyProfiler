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
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type User = {
  id: string;
  firstname: string;
  surname: string;
  image: string;
}
type Session = {
  user: {
    email: string;
  }
}

export default  function TopBar() {
  
  const supabase = createClientComponentClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>({id: '', firstname: '', surname: '', image: ''});
  const [session, setSession] = useState<Session | null>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }
  
  
useEffect(() => {
  const fetchData = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    let { data: Users} = await supabase
      .from('Users')
      .select('*')
      .eq('id', session?.user.id)
    if (Users && Users.length > 0) {
      setUser(Users[0]);
    }
    setSession(session as Session);
  }
  fetchData();
}, [supabase,session]);

  return (
    <div className='w-full h-24 flex justify-center    '>
      <div className=' w-[95%] h-full flex justify-between items-center  border-b-[1px] p-4' >
        <h1 className='text-3xl font-light flex justify-center items-center gap-2'><UserRound size={32}/>MyProfiler</h1>
        <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger>
              <div className='flex justify-center items-center gap-3 hover:bg-neutral-200 rounded-lg px-2 py-1 transition-all cursor-pointer'>
                  <span className='text-lg'>{user?.firstname+" "+user?.surname }</span>
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
              <Link href={'/'} onClick={handleSignOut}>
                Wyloguj się
              </Link>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent >
          <DialogHeader>
            <DialogTitle className="pb-4">Aktualne dane</DialogTitle>
            <DialogDescription className='flex justify-between text-black '>
              <div className="flex flex-col w-1/2">
                <span className="font-semibold text-base">Imię: </span>
                {user?.firstname}
                <span className="font-semibold text-base">Nazwisko: </span>
                {user?.surname}
                <span className="font-semibold text-base">Email: </span>
                {session?.user.email}
              </div>
              <div className="flex justify-center w-1/2">
                <Suspense fallback={<p>Loading...</p>}>
                  <Avatar className="w-24 h-24 hover:cursor-pointer hover:opacity-75 transition-all ">
                    <AvatarImage src={`${user?.image}`} />
                    <AvatarFallback>E4</AvatarFallback>
                  </Avatar>
                </Suspense>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>  
    </div>
  )
}
