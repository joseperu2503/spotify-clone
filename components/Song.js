import React from 'react'
import { millisToMinutesAndSeconds } from '../lib/time'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import useSpotify from '../hooks/useSpotify';
import Link from 'next/link';


const Song = ({order, track}) => {

  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = async () => {
    // setCurrentTrackId(track.track.id)
    // setIsPlaying(true)
    // spotifyApi.play({
    //   uris: [track.track.uri]
    // })
  }

  return (
    <div
      className=' text-gray-500 py-4 px-4 hover:bg-gray-900 rounded-lg'
      onClick={playSong}
    >
      <div className='grid grid-cols-song items-center gap-4'>
        <div className='flex justify-end'>{order + 1}</div>
        <div className='flex gap-4'>
          <img className='h-10 w-10' src={track.track?.album.images[0].url} alt="" />
          <div className='grid'>
            <p className='text-white truncate'>{track.track.name}</p>
            <p className='text-sm hover:underline '>
              <Link href={`/artist/${track.track.artists[0].id}`}>
                {track.track.artists[0].name}
              </Link>
            </p>
          </div>
        </div>

        <p className='hidden md:inline'>{track.track.album.name}</p>
        <p className='hidden md:inline'>3 ene 2020</p>
        <div className=''>{millisToMinutesAndSeconds(track.track.duration_ms)}</div>
      </div>
    </div>
  )
}

export default Song
