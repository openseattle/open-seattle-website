import Container from '../components/Container'
import Layout from '../components/Layout'
import CardEvent from '../components/cards/CardEvent'

export default function VolunteerForm() {
  return (
    <Layout>
      <Container>
        <CardEvent/>
        {/* <CardOne
          title="h"
          description='h'
          buttonText='click'
          buttonLink='#'
          /> */}
        <iframe
          class="airtable-embed airtable-dynamic-height"
          src="https://airtable.com/embed/shr1lbcr3qmkoIbNW?backgroundColor=purpleLight"
          frameborder="0"
          width="100%"
          height="3610"
          style={{
            background: 'transparent',
            border: '1px solid #ccc',
            overflow: 'hidden',
          }}
        ></iframe>
      </Container>
    </Layout>
  )
}
