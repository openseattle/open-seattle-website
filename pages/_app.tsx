import 'styles/global.css'

import { Lato, League_Gothic } from '@next/font/google'
import { IBM_Plex_Mono, Inter, PT_Serif } from '@next/font/google'
import { AppProps } from 'next/app'

const lato = Lato({
  variable: '--font-lato',
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal', 'italic'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

const leagueGothic = League_Gothic({
  variable: '--font-league-gothic',
  display: 'swap',
  subsets: ['latin'],
  style: 'normal',
  weight: ['400'],
})

// const serif = PT_Serif({
//   variable: '--font-serif',
//   style: ['normal', 'italic'],
//   subsets: ['latin'],
//   weight: ['400', '700'],
// })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-lato: ${lato.style.fontFamily};
            --font-league-gothic: ${leagueGothic.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
