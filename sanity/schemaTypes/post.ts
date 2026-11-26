import { defineArrayMember, defineField, defineType } from "sanity";
import { Newspaper } from "lucide-react";

export const post = defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  icon: Newspaper,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      description: "e.g. Die Engineering, Injection Moulding, Fixtures & Gauges",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading Time (minutes)",
      type: "number",
      initialValue: 4,
      validation: (rule) => rule.required().integer().min(1).max(60),
    }),
    defineField({
      name: "excerpt",
      title: "Short Summary",
      type: "text",
      rows: 3,
      description: "Max 180 characters (shown on homepage card).",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "mainImage",
      title: "Cover Image",
      type: "image",
      description: "Recommended: landscape photo (at least 1200px wide).",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article Content (Optional for now)",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "publishedAt",
      media: "mainImage",
    },
    prepare({ title, subtitle, date, media }) {
      return {
        title: title || "Untitled Article",
        subtitle: [subtitle, date].filter(Boolean).join(" • "),
        media,
      };
    },
  },
});
