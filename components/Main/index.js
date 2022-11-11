import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import { useRecoilState } from 'recoil'
import { scrollState } from '../../atoms/scrollAtom'
import { useRouter } from 'next/router';


const Main = ({session,children}) => {

  const [scroll, setScroll] = useRecoilState(scrollState);
  const myRef = useRef();
  const route = useRouter()

  const handleScroll = (e) => {
    setScroll(e.target.scrollTop)
  }

  useEffect(() => {
    myRef.current.scrollTo(0, 0);
  }, [route]);

  console.log('renderizando main')

  return (
    <>
      <Header session={session} scroll={scroll}/>
      <div className='fixed top-0 left-60 right-0 bottom-0 overflow-y-auto' onScroll={handleScroll} ref={myRef}>
        {children}
      </div>
    </>
  )
}

export default Main
