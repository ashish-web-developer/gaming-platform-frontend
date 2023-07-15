import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Mui
import { ThemeProvider } from '@mui/styles'
import { createTheme } from '@mui/material'


// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'


const theme = createTheme({
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <ThemeProvider theme = {theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
