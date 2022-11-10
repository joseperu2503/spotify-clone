import React from 'react'
import Song from './Song'

const Songs2 = ({playlist}) => {

  return (
    <div className='flex flex-col space-y-1 pb-28 text-white'>
      {playlist?.tracks?.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i}/>
      ))}
    </div>
  )
}

export default Songs2
