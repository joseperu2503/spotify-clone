import { getSession } from 'next-auth/react'
import React from 'react'
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Main from '../components/Main'


const AppLayout = ({children}) => {
  const { data: session } = useSession()



  return (
    <div className='min-h-screen bg-black'>

        <Sidebar/>
        <Main session={session}>
          {children}
        </Main>

      {/* <div className='sticky bottom-0'>
        <Player/>
      </div> */}

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
