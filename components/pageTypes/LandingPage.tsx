import TextWithIllustration from 'components/TextWithIllustration'
import Layout from 'components/Layout'

export default function LandingPage({ content }) {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl lg:px-6 xl:px-8">
        {content?.slots?.map(
          (slot) =>
            slot._type === 'textWithIllustration' && (
              <TextWithIllustration key={slot._key} {...slot} />
            )
        )}
      </div>
    </Layout>
  )
}
