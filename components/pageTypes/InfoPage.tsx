import { PortableText } from '@portabletext/react'
import Layout from 'components/Layout'

import components from '../../lib/portableTextComponent'

export default function InfoPage({ content }) {
  return (
    <Layout>
      <div className="circuit-pattern absolute top-0 left-0 -z-50 h-full w-full" />
      <div className="relative h-full">
        <div className="max-7xl mx-auto h-full">
          <div className="relative mx-auto h-full max-w-7xl bg-gray-700 px-6 py-16 lg:px-8">
            <article className="prose prose-lg z-10 mx-auto max-w-prose prose-h1:text-center dark:prose-invert">
              <PortableText value={content.content} components={components} />
            </article>
          </div>
        </div>
      </div>
    </Layout>
  )
}
