import { LoginForm } from '../components/LoginPage/LoginForm'
import Image from "next/image";

export default async function Home() {

  return (
    <main className="w-full h-screen flex justify-center">
      <div className="w-4/6 h-full  justify-center md:flex hidden ">
        <Image src={"/hero.svg"} alt={"HeroImg"} width={500} height={500} />
      </div>
      <div className="w-full md:w-2/6 h-full    p-4 py-6">
        
        <div className='md:border-l-[1px] h-full p-4 '>
          <h1 className=" text-3xl font-semibold ">MyProfiler</h1>
          <div className="h-4/5 flex flex-col justify-center  ">
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
