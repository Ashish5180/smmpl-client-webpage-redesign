import { defineField, defineType } from "sanity";
import { Factory } from "lucide-react";

export const industry = defineType({
  name: "industry",
  title: "Industries",
  type: "document",
  icon: Factory,
  fields: [
    defineField({
      name: "name",
      title: "Industry Name",
      type: "string",
      description: "e.g. Automotive, Home Appliances, Medical",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tag",
      title: "Top Eyebrow Tag",
      type: "string",
      description: "e.g. TIER-1 OEM SUPPLIER",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tolerance",
      title: "Tolerance Badge",
      type: "string",
      description: "e.g. ±0.010 mm or SPI A1 Finish",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "specs",
      title: "Specs Highlight",
      type: "string",
      description: "Short comma-separated tooling list.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "image",
      title: "Card Background Photo",
      type: "image",
      description: "Recommended: landscape or 4:3 photo (at least 1000px wide).",
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
      name: "href",
      title: "Target Link",
      type: "string",
      initialValue: "/products",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1).max(10),
    }),
  ],
  orderings: [
    {
      title: "Display Order (1 → N)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", order: "order", media: "image" },
    prepare({ title, order, media }) {
      return {
        title: title || "Untitled Industry",
        subtitle: order ? `Card #${order}` : undefined,
        media,
      };
    },
  },
});
