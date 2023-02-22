import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const externalLink = defineType({
  title: 'External Link',
  name: 'externalLink',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      title: 'Open in new tab',
      name: 'blank',
      description: 'Read https://css-tricks.com/use-target_blank/',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  options: {
    collapsible: false,
  },
})

export const internalLink = defineType({
  title: 'Internal link',
  name: 'internalLink',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'landingPage' }, { type: 'infoPage' }, { type: 'formPage' }],
    }),
  ],
  options: {
    collapsible: false,
  },
})

export default defineType({
  name: 'selectableLink',
  type: 'object',
  title: 'Link',
  icon: LinkIcon,
  fields: [
    defineField({
      title: 'Link Text',
      name: 'linkText',
      type: 'string',
    }),
    defineField({
      title: 'Is External',
      name: 'isExternal',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'External Link',
      name: 'externalLink',
      type: 'externalLink',
      hidden: ({ parent }) => !parent?.isExternal,
    }),
    defineField({
      title: 'Internal Link',
      name: 'internalLink',
      type: 'internalLink',
      hidden: ({ parent }) => parent?.isExternal,
    }),
  ],
})
