import { getSession } from 'next-auth/react'
import React from 'react'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'

const AppLayout = ({children}) => {
  return (
    <div className='bg-black h-screen overflow-hidden w-full'>
      <main className='grid grid-cols-layout w-full'>
        <Sidebar/>
        {children}
      </main>
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
