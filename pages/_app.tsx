import '../styles/globals.css'
import type { AppProps } from 'next/app'

// Mui
import { ThemeProvider ,createGenerateClassName,StylesProvider} from '@mui/styles'
import { createTheme } from '@mui/material'


// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'


// Provider
import CsrfTokenProvider from '@/providers/CsrfTokenProvider'
import UserProvider from '@/providers/UserProvider'


const theme = createTheme({
})


const generateClassName = createGenerateClassName({
  productionPrefix:"p"
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Provider store = {store}>
        <ThemeProvider theme = {theme}>
          <CsrfTokenProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </CsrfTokenProvider>
        </ThemeProvider>
      </Provider>
    </StylesProvider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
