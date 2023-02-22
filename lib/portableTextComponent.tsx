import { PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'

const components: PortableTextComponents = {
  marks: {
    internalLink: ({ value, children }) => {
      const { href } = value
      return <Link href={href || '/'}>{children}</Link>
    },
    externalLink: ({ value, children }) => {
      const { blank, href } = value
      return blank ? (
        <Link href={href} target="_blank" rel="noopener">
          {children}
        </Link>
      ) : (
        <Link href={href}>{children}</Link>
      )
    },
  },
}

export default components
