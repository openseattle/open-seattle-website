import 'styles/global.css'
import 'styles/preflight.css'
import Head from 'next/head'

import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import { theme } from 'theme/theme'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { dasProjectsService } from 'src/ProjectsService'

const DEFAULT_TAG =
  'Free tech solutions for Puget Sound nonprofits | Digital Aid Seattle'
const TAG_NAMES = {
  events: 'Events | Digital Aid Seattle',
  volunteers: 'Volunteer with us | Digital Aid Seattle',
  partners: 'Get help with your nonprofit | Digital Aid Seattle',
  about: 'About us | Digital Aid Seattle',
  projects: 'Projects | Digital Aid Seattle',
  privacy: 'Privacy policy | Digital Aid Seattle',
  cadre: 'The Cadre | Digital Aid Seattle',
}

export default function App({ Component, pageProps }: AppProps) {
  const pathName = usePathname()
  const searchParams = useSearchParams()

  const [title, setTitle] = useState(DEFAULT_TAG)
  useEffect(() => {
    const lookupTitle = async (pathName: string) => {
      let pageName = null
      if (pathName) {
        const path = pathName.split('/')
        pageName = path[path.length - 1]
      }
      switch (pageName) {
        case 'project_individual':
          const project = searchParams.get('project')
          const p = await dasProjectsService.getOne(project)
          return p ? p.title.concat(' | Digital Aid Seattle') : DEFAULT_TAG
        case 'volunteer_individual':
          return 'TBD' // When role pages come online
        default:
          const tag = TAG_NAMES[pageName]
          return tag ?? DEFAULT_TAG
      }
    }
    if (pathName) {
      lookupTitle(pathName).then((title) => setTitle(title))
    }
  }, [pathName, searchParams])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
