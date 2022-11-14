import React, { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useRecoilState } from 'recoil'
import { scrollState } from '../../atoms/scrollAtom'
import SearchIcon from '../Sidebar/Icons/Search'
import ClearIcon from './Icons/Clear'
import { useRouter } from 'next/router'

const Header = ({session}) => {

  const router = useRouter()
  const [scroll, setScroll] = useRecoilState(scrollState);
  const [opacity, setOpacity] = useState(0);
  const [searchValue, setSearchValue] = useState('');


  console.log('renderizando header')

  useEffect(() => {
    if(scroll >= 144 && scroll <= 206){
      setOpacity((scroll - 144)/61)
    }
    if(scroll < 144){
      setOpacity(0)
    }
    if(scroll > 206){
      setOpacity(1)
    }
  }, [scroll]);

  useEffect(() => {
    console.log('router',router)
    if(router.pathname.startsWith('/search') && router.query.search){
      setSearchValue(router.query.search)
    }
  }, [router]);

  const changeSearchValue = (value) => {
    setSearchValue(value)
    router.push(`/search/${value}`)
  }

  return (
    <div className='fixed left-60 right-0 z-10 h-16 '>
        <div className=' absolute bg-black right-0 left-0 top-0 bottom-0' style={{opacity: opacity}}></div>
        <header className='absolute h-16 flex justify-between px-8 items-center gap-4 w-full'>
          <div className='flex bg-white rounded-full h-10 items-center px-3 gap-4 w-[363px]'>
            <SearchIcon/>
            <input
              type="text"
              placeholder='What do you want to listen to?'
              className='outline-none grow text-sm'
              value={searchValue}
              onChange={(e) => changeSearchValue(e.target.value)}
            />
            <div className='cursor-pointer' onClick={() => changeSearchValue('')}>
              <ClearIcon/>
            </div>

          </div>
          <div
            className='flex items-center text-white h-8 gap-2 bg-black  opacity-90 hover:opacity-80 cursor-pointer rounded-full p-0.5'
            onClick={() => signOut()}
          >
            <img className='rounded-full w-7 h-7' src={session?.user.image} alt="" />
            <h2 className='text-sm font-semibold'>{session?.user.name}</h2>
            <ChevronDownIcon className='h-4 w-4 mr-1.5'/>
          </div>
        </header>

    </div>
  )
}

export default Header
