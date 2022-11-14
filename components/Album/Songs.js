import React from 'react'
import Song from './Song'
import SongsLayout from '../SongsLayout'

const Songs = ({tracks, limit = null, widthImage = false}) => {
  return (
    <SongsLayout>
      {tracks?.map((track, index) => {
        if((limit != null && index < limit) || !limit){
          return <Song track={track} index={index} key={index} widthImage={widthImage}/>
        }
      })}
    </SongsLayout>
  )
}

export default Songs
