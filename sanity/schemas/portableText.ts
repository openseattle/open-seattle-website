import { defineType } from 'sanity'

export default defineType({
  name: 'portableText',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      marks: {
        annotations: [{ type: 'selectableLink' }],
      },
    },
  ],
})
