import { defineCollection, z } from "astro:content"

const rambling = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional()
	})
})

const paper = defineCollection({
	schema: z.object({
		title: z.string(),
		link: z.string(),
		authors: z.array(
			z.object({
				name: z.string(),
				order: z.number(),
				me: z.boolean().optional()
			})
		),
		abstract: z.string(),
		publisher: z.string(),
		pubDate: z.date(),
		github: z.string().optional()
	})
})

export const collections = { rambling, paper }
