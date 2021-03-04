import { useState } from 'react'

import '../styles/global.css'

import { CountdownProvider } from '../contexts/CountdownContex';

function MyApp({ Component, pageProps }) {
  const [level, setLevel] = useState(1);

  function leveup() {
    setLevel(level + 1);
  }

  return (
       <Component {...pageProps} />
  
  )
}

export default MyApp
