import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'
import { homePageQuery, pagePaths, pagesBySlugQuery } from './queries'

export const sanityClient = (token?: string, useCdn?: boolean) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}) {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, {
    slug: slug || 'home',
  })
}

export async function getHomePage() {
  return await sanityClient()?.fetch(homePageQuery)
}

export async function getPagePaths(): Promise<string[] | undefined> {
  return await sanityClient()?.fetch(pagePaths)
}
