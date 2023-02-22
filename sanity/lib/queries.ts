import { groq } from 'next-sanity'

export const pagePaths = groq`
  *[_type match "*Page" && _type != "formPage" && slug.current != null].slug.current
`

export const linkParseQuery = groq`
  {
    _type == "selectableLink" && isExternal == false => {
      linkText,
      _key,
      ...@.internalLink,
      "href": "/" + @.internalLink.reference->slug.current
    },
    _type == "selectableLink" && isExternal == true => {
      linkText,
      _key,
      ...@.externalLink
    }
  }
`

export const landingPageQuery = groq`
  {
    ...,
    slots[] {
      ...,
      link${linkParseQuery}
    }
  }
`

export const infoPageQuery = groq`
  {
    ...,
    content[] {
      ...,
      markDefs[]${linkParseQuery}
    }
  }
`

export const pagesBySlugQuery = groq`
  *[_type match "*Page" && slug.current == $slug][0] {
    _type == "landingPage" => ${landingPageQuery},
    _type == "infoPage" => ${infoPageQuery},
  }
`

export const homePageQuery = groq`
  *[_type == "landingPage" && slug.current == null][0] {
    ...,
    slots[] {
      ...,
      link${linkParseQuery}
    }
  }
`
