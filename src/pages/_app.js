import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import '@/styles/globals.css'
import { CartProvider } from 'react-use-cart'

export default function App({ Component, pageProps }) {
  return(
    <>
  <CartProvider>
  <Nav/>
     <Component {...pageProps} />
     <Footer/>
  </CartProvider>
    </>
  ) 
}
