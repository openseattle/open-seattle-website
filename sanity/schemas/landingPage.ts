import { defineArrayMember, defineField, defineType } from 'sanity'

import { isUniqueAcrossAllDocuments } from '../lib/helpers'

export default defineType({
  title: 'Landing Page',
  name: 'landingPage',
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
      title: 'Slots',
      name: 'slots',
      type: 'array',
      of: [
        defineArrayMember({ type: 'textWithIllustration' }),
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({
          type: 'object',
          title: 'Text Content',
          name: 'textContent',
          fields: [
            defineField({
              title: 'Title',
              name: 'title',
              type: 'string',
            }),
            defineField({
              title: 'Content',
              name: 'content',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
        }),
      ],
    }),
  ],
})
