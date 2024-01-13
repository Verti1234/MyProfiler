"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type user = {
  firstName: string,
  SurName: string,
  email: string,
  image: string
}

export default function UserInfo({user}: {user: user | undefined}) {

  return (
    <div  className='flex justify-between text-black '>
      <div className="flex flex-col w-1/2">
        <span className="font-semibold text-base">Imię: </span>
        {user?.firstName}
        <span className="font-semibold text-base">Nazwisko: </span>
        {user?.SurName}
        <span className="font-semibold text-base">Email: </span>
        {user?.email}
      </div>
      <div className="flex justify-center w-1/2">
        <Avatar className="w-24 h-24 border-[1px] " >
          <AvatarImage src={`${user?.image}`} />
          <AvatarFallback>E4</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
