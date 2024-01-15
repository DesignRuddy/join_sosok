import Checkout from '@/pages/Checkout'
import type { AppProps } from 'next/app'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App({ Component, pageProps }: AppProps) {

  return (
    
    <>
      <Component {...pageProps} />
    </>

  )
}