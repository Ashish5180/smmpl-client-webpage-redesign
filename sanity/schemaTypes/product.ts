import { defineField, defineType } from "sanity";
import { Boxes } from "lucide-react";

export const product = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: Boxes,
  fields: [
    defineField({
      name: "title",
      title: "Product Category Name",
      type: "string",
      description: "e.g. Plastic Moulds, Casting Dies",
      validation: (rule) => rule.required(),
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
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Max 160 characters (2 lines under preview image).",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "image",
      title: "Product Photo",
      type: "image",
      description: "Recommended: portrait 4:5 or square photo (at least 1000px wide).",
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
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls 01, 02, 03 numbering on homepage.",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1).max(30),
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
    select: { title: "title", order: "order", media: "image" },
    prepare({ title, order, media }) {
      const num = order ? String(order).padStart(2, "0") : "--";
      return {
        title: `${num} — ${title || "Untitled Product"}`,
        media,
      };
    },
  },
});
