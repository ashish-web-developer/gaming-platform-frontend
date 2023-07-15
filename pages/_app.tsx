import '../styles/globals.css'
import type { AppProps } from 'next/app'


// Redux
import { Provider } from 'react-redux'
import store from '@/store/rootReducer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <Component {...pageProps} />
    </Provider>
  )
  //return <Component {...pageProps} />
}

export default MyApp
