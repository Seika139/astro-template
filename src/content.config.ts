import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    pubDate: z.string().transform((str) => new Date(str)),
    updatedDate: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
    author: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = {
  blog: blogCollection,
};
