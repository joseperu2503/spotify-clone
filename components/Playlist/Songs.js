import React from 'react'
import Song from './Song'
import SongsLayout from '../SongsLayout'

const Songs = ({tracks}) => {
  return (
    <SongsLayout>
      {tracks?.map((track, index) => (
        <Song track={track} index={index} key={index}/>
      ))}
    </SongsLayout>
  )
}

export default Songs
