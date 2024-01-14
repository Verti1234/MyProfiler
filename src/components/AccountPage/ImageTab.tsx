"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { UploadButton } from '@/lib/uploadthing'

import { useSession } from 'next-auth/react'
import { toast } from 'sonner';


export default function ImageTab() {
  const { update } = useSession();
  return (
    <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Zmień zdjęcie profilowe</CardTitle>
            <CardDescription>Kilknij aby zmienić awatara po wybraniu zdjęcie zmieni się automatycznie</CardDescription>
          </CardHeader>
          <CardContent className='h-full w-full flex flex-col justify-start items-center gap-16 '>

            <UploadButton
              className='h-32 w-32 rounded-full bg-gray-200 flex justify-center items-center'
              endpoint="imageUploader"

              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                toast.success("Zdjęcie profilowe zostało zmienione")
                update()
              }}
              onUploadError={(error: Error) => {
                console.log("Error: ", error);
                
                toast.error("Wystąpił błąd podczas zmiany zdjęcia profilowego",{
                  description: error.message
                })
              }}
            />
          </CardContent>
        </Card>
  )
}
