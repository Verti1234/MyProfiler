import { db } from "@/lib/db"


export async function POST(req:Request){
  
  const body = await req.json()
  const user = await db.user.findUnique({
    where: {
      id: body.session.user.id
    }
  })
  if(user){
    return new Response(JSON.stringify(user),{status:200})
  }else{
    return new Response('Unauthorized', {status:401})
  }
  
  

}