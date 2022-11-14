import Link from 'next/link'
import React from 'react'
import Album from '../Artist/Album'

const NewReleases = ({newReleases}) => {
  return (
    <section className='flex flex-col'>
      <div className='flex mb-4 items-center'>
        <div className='grow'>
          <h2 className='text-2xl font-bold'>New Releases</h2>
        </div>
        <Link href={'/hola'} className="ml-2 text-xs font-bold text-[#b3b3b3] hover:underline">SEE ALL</Link>
      </div>
      <div className='grid grid-cols-4 grid-rows-[1fr] overflow-y-hidden  gap-6'>
        {newReleases.map((newRelease, index) => {if(index<4)return(
          <Album album={newRelease} key={index} type='release'/>
        )})}
      </div>
    </section>
  )
}

export default NewReleases
