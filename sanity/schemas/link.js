import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  type: 'object',
  title: 'Link',
  fields: [
    defineField({
      name: 'linkText',
      type: 'string',
      title: 'Link Text',
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'URL',
    }),
  ],
})
