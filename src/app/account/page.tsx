
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
      <div className='w-full  h-[calc(100%-6rem)] flex justify-center items-center'>
        <Tabs defaultValue="account" className="w-3/6 h-5/6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Dane logowania</TabsTrigger>
            <TabsTrigger value="password"> Dane osobowe</TabsTrigger>
            <TabsTrigger value="image">Zdjecie profilowe</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="h-5/6">
            <DataLoginTab />
          </TabsContent>
          <TabsContent value="password" className="h-5/6">
            <DataPersonalTab />
          </TabsContent>
          <TabsContent value="image" className="h-5/6">
            <ImageTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
