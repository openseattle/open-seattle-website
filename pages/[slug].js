import Layout from '../components/Layout'
import InfoPage from '../components/pageTypes/InfoPage'
import LandingPage from '../components/pageTypes/LandingPage'
import { getPageBySlug, getPagePaths } from '../sanity/lib/client'

const pageTypes = {
  infoPage: InfoPage,
  landingPage: LandingPage,
}

export default function DynamicPage({ page }) {
  console.log(page)
  const PageType = pageTypes[page._type]
  return <PageType content={page} />
}

export async function getStaticProps(ctx) {
  const { slug = '' } = ctx.params

  const page = await getPageBySlug({ slug })

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      page,
    },
  }
}

export async function getStaticPaths() {
  const paths = await getPagePaths()
  console.log('PATHS', paths)

  return {
    paths: paths?.map((slug) => `/${slug}`) || [],
    fallback: false,
  }
}
