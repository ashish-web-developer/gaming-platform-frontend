import '../styles/globals.css'
import type { AppProps } from 'next/app'


// mui
import { ThemeProvider } from 'styled-components'

// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'


// Provider
import CsrfTokenProvider from '@/providers/CsrfTokenProvider'
import UserProvider from '@/providers/UserProvider'
import getTheme from 'theme'


function MyApp({ Component, pageProps }: AppProps) {
  const theme = getTheme("dark");
  return (
    <ThemeProvider theme = {theme}>
      <Provider store = {store}>
          <CsrfTokenProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </CsrfTokenProvider>
      </Provider>
    </ThemeProvider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
