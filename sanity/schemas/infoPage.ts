import { defineArrayMember, defineField, defineType } from 'sanity'

import { isUniqueAcrossAllDocuments } from '../lib/helpers'

export default defineType({
  title: 'Info Page',
  name: 'infoPage',
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        isUnique: isUniqueAcrossAllDocuments,
      },
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'portableText',
    }),
  ],
})
