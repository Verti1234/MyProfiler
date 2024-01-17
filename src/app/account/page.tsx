
import TopBar from '@/components/AccountPage/TopBar'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DataLoginTab from '@/components/AccountPage/DataLoginTab';
import DataPersonalTab from '@/components/AccountPage/DataPersonalTab';
import ImageTab from '@/components/AccountPage/ImageTab';

export default  function Page() {
  
  return (
    <div className='w-full h-screen'>
      <TopBar /> 
      <div className='w-full  h-[calc(100%-6rem)] flex justify-center md:items-center '>
        <Tabs defaultValue="account" className="md:w-3/6 md:h-5/6 p-4 ">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Dane logowania</TabsTrigger>
            <TabsTrigger value="password">Dane osobowe</TabsTrigger>
            <TabsTrigger value="image">Zdjęcie profilowe</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="">
            <DataLoginTab />
          </TabsContent>
          <TabsContent value="password" className="">
            <DataPersonalTab />
          </TabsContent>
          <TabsContent value="image" className="">
            <ImageTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
