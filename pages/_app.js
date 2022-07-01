import '../styles/globals.css';
import { StoreProvider } from '../context/StoreProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </>
  )
}

export default MyApp
