import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { LoginForm } from '../components/LoginPage/LoginForm'
import Image from "next/image";
import { Database } from '@/lib/database.types';
import { cookies } from "next/headers";

export default async function Home() {

  //test
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  return (
    <main className="w-full h-screen flex">
      <div className="w-4/6 h-full flex justify-center ">
        <Image src={"/hero.svg"} alt={"xD"} width={500} height={500} />
      </div>
      <div className="w-2/6 h-full   p-4 py-6">
        
        <div className='border-l-[1px] h-full p-4'>
          <h1 className=" text-3xl font-semibold ">MyProfiler</h1>
          <div className="h-4/5 flex flex-col justify-center ">
            <div className='flex flex-col justify-center items-center gap-2'>
              <h2 className='text-5xl'>Witaj</h2>
              <span className='text-sm'>Wprowadź swoje dane</span>
            </div>
            <div className='flex justify-center '>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
