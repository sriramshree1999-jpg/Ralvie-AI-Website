import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Posts',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Used in the article URL, for example /blog/ai-voice-agents-for-business',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Short summary displayed on the blog archive and used as an SEO fallback.',
      validation: (Rule) => Rule.max(300).warning('Try to keep the excerpt below 300 characters.'),
    }),

    defineField({
      name: 'mainImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'category'}],
        },
      ],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      description: 'Featured articles can appear prominently on the blog archive page.',
      initialValue: false,
    }),

    defineField({
      name: 'body',
      title: 'Article Content',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },

      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Leave empty to use the article title automatically.',
          validation: (Rule) =>
            Rule.max(70).warning('SEO titles are usually best kept around 50–60 characters.'),
        }),

        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Leave empty to use the article excerpt automatically.',
          validation: (Rule) =>
            Rule.max(180).warning(
              'SEO descriptions are usually best kept around 150–160 characters.',
            ),
        }),

        defineField({
          name: 'ogImage',
          title: 'Social Sharing Image',
          type: 'image',
          description: 'Optional image used when the article is shared on social platforms.',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        }),

        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional. Use only if the canonical URL differs from the article URL.',
        }),

        defineField({
          name: 'noIndex',
          title: 'Hide From Search Engines',
          type: 'boolean',
          description: 'Enable only when this article should not appear in search engines.',
          initialValue: false,
        }),
      ],
    }),
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      publishedAt: 'publishedAt',
    },

    prepare({title, author, media, publishedAt}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No publish date'

      return {
        title,
        subtitle: `${author || 'No author'} • ${date}`,
        media,
      }
    },
  },
})
