import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Mui
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'


// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'


// Provider
import CsrfTokenProvider from '@/providers/CsrfTokenProvider'


const theme = createTheme({
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <ThemeProvider theme = {theme}>
        <CsrfTokenProvider>
          <Component {...pageProps} />
        </CsrfTokenProvider>
      </ThemeProvider>
    </Provider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
