import React from 'react'
import { yearAlbum } from '../../lib/time'

const Header = ({album, artist, color}) => {
  return (
    <section className={`flex items-end justify-start ${color} h-header-album max-h-[500px] min-h-[340px] text-white px-8 pb-6 w-full relative`}>
      <div className='absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-b to-black from-transparent opacity-50'>
      </div>
      <img src={album?.images?.[0]?.url} alt="" className='h-48 w-48 lg:h-[232px] lg:w-[232px] shadow-2xl z-0 mr-6'/>

      <div className=' z-0'>
        <p className='text-xs font-bold'>ALBUM</p>
        <h1 className='text-2xl md:text-3xl xl:text-6xl font-bold mt-1 mb-6'>{album?.name}</h1>
        <div className='flex gap-1'>
          <img className='w-6 h-6 rounded-full' src={artist?.images?.[0].url} alt="" />
          <p className='font-semibold text-sm'>{artist.name} &bull; {yearAlbum(album)} &bull; {album?.tracks?.items.length} songs</p>
        </div>
      </div>
    </section>
  )
}

export default Header
