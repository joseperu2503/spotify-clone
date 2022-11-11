import '../styles/globals.css'
import { RecoilRoot} from 'recoil'
import { SessionProvider } from 'next-auth/react'
// import "overlayscrollbars/css/OverlayScrollbars.css";

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        { Component.PageLayout ? <Component.PageLayout>
          <Component {...pageProps} />
        </Component.PageLayout> :
          <Component {...pageProps} />
        }
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
