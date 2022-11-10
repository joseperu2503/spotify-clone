import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Center from '../components/Center'
import Player from '../components/Player'
import AppLayout from '../Layouts/AppLayout'
import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    // <div className='bg-black h-screen overflow-hidden'>

    //   <main className='flex'>
    //     <Sidebar/>
    //     {/* <Center/> */}
    //   </main>
    //   <div className='sticky bottom-0'>
    //     <Player/>
    //   </div>
    // </div>
    <Center/>
  )
}

Home.PageLayout = AppLayout

export async function getServerSideProps(context){
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
