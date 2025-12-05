"use client"

import { useCurrentUser } from '@/components/providers/UserProvider'
import React, { useEffect } from 'react'
import { toast } from 'sonner';

export default function Dashboard(){
  const {user} = useCurrentUser();

  useEffect(() =>{
    toast.success(`Welcome back! ${user?.name}`)
  }, [])

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <div>
          Dashboard content will go here...
        </div>
      </div>
    </>
  )
}
