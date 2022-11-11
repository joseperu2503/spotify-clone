import React, { useEffect, useRef, useState } from 'react'
import Header from './Header';
import { useRecoilState } from 'recoil'
import { scrollState } from '../../atoms/scrollAtom'
import { useRouter } from 'next/router';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import "overlayscrollbars/css/OverlayScrollbars.css";

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
      <div className='fixed top-0 left-60 right-0 bottom-0 h-screen' onScroll={handleScroll} ref={myRef}>
        <OverlayScrollbarsComponent options={{
          className       : "os-theme-light",
          resize          : "both",
          sizeAutoCapable : true,
          paddingAbsolute : true,
          scrollbars : {
            clickScrolling : true
          }
        }}>
          <div className='h-screen'>
            {children}
          </div>

        </OverlayScrollbarsComponent>
      </div>

      {/* <OverlayScrollbarsComponent options={{
        className       : "os-theme-light",
        resize          : "both",
        sizeAutoCapable : true,
        paddingAbsolute : true,
        scrollbars : {
          clickScrolling : true
        }
      }}>
        <div className='w-40 h-screen'>
          <div className='w-full bg-red-400 h-60'>d</div>
          <div className='w-full bg-red-400 h-60'>s</div>
          <div className='w-full bg-red-400 h-60'>s</div>
          <div className='w-full bg-red-400 h-60'></div>
          <div className='w-full bg-red-400 h-60'></div>
          <div className='w-full bg-red-400 h-60'>s</div>
          <div className='w-full bg-red-400 h-60'></div>
          <div className='w-full bg-red-400 h-60'></div>
          <div className='w-full bg-red-400 h-60'></div>
        </div>
      </OverlayScrollbarsComponent> */}
    </>
  )
}

export default Main
