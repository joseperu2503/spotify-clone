import { getSession } from 'next-auth/react'
import React from 'react'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'


const AppLayout = ({children}) => {
  const { data: session } = useSession()

  return (
    <div className='bg-black h-screen overflow-hidden w-full'>
      <div className='grid grid-cols-layout w-full'>

        <Sidebar/>
        <div className='relative'>
          <header className='absolute top-0 right-0 z-10 left-0 h-16  flex justify-end px-8 items-center'>
            <div
              className='flex items-center text-white h-8 gap-2 bg-black  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-0.5'
              onClick={() => signOut()}
            >
              <img className='rounded-full w-7 h-7' src={session?.user.image} alt="" />
              <h2 className='text-sm font-semibold'>{session?.user.name}</h2>
              <ChevronDownIcon className='h-4 w-4 mr-1.5'/>
            </div>
          </header>
          <div className='fixed overflow-y-scroll min-h-screen'>
            {children}
          </div>

        </div>

      </div>
      <div className='sticky bottom-0'>
        <Player/>
      </div>

    </div>
  )
}

export default AppLayout

export async function getServerSideProps(context){
  const session = await getSession(context)
  return {
    props: {
      session
    }
  }
}
