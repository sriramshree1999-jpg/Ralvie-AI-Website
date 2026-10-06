import {defineArrayMember, defineField, defineType} from 'sanity'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Blog Content',
  type: 'array',

  of: [
    defineArrayMember({
      type: 'block',

      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],

      lists: [
        {title: 'Bullet List', value: 'bullet'},
        {title: 'Numbered List', value: 'number'},
      ],

      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],

        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',

            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              }),

              defineField({
                name: 'openInNewTab',
                title: 'Open in New Tab',
                type: 'boolean',
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),

    defineArrayMember({
      type: 'image',
      title: 'Article Image',

      options: {
        hotspot: true,
      },

      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe this image for accessibility.',
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
  ],
})
