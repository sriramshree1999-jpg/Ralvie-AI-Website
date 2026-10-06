import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Authors',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility.',
        }),
      ],
    }),

    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
