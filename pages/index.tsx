import LandingPage from '../components/pageTypes/LandingPage'
import { getHomePage } from '../sanity/lib/client'
import Layout from '../components/Layout'
export default function DynamicPage({ page }) {
  console.log('PAGE', page)

  return <LandingPage content={page} />
}

export async function getStaticProps() {
  const page = await getHomePage()

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
