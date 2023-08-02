import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Mui
import { createTheme } from '@mui/material'


// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'


// Provider
import CsrfTokenProvider from '@/providers/CsrfTokenProvider'
import UserProvider from '@/providers/UserProvider'



function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store = {store}>
          <CsrfTokenProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </CsrfTokenProvider>
      </Provider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
