import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function POST(req:Request){
  try {
    const session = await getServerSession()
    if(!session?.user){
      return new Response('Unauthorized', {status:401})
    }
    const body = await req.json()
    await db.user.update({
      where:{
        id: body.session.user.id
      },
      data:{
        firstName: body.imie,
        SurName: body.nazwisko,
      }
    })
    return new Response('OK', {status:200})
  } catch (error) {
    if(error instanceof z.ZodError){
      return new Response('Invalid request data passsed', {status:422})
    }

    return new Response('Could not update username, please try again later', {status:500})
  }
}