import { defineField, defineType } from "sanity";
import { Images } from "lucide-react";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slides",
  type: "document",
  icon: Images,
  fields: [
    defineField({
      name: "productName",
      title: "Product / Slide Label",
      type: "string",
      description: "Shown in the bottom-right pill on the hero banner (e.g. Plastic Moulds).",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "image",
      title: "Slide Image",
      type: "image",
      description: "Upload a clean landscape photo (recommended: 1920x1080px, JPG or WebP). Use the crop circle to set focal point.",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Short description of the image for accessibility & SEO.",
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Slide Order",
      type: "number",
      description: "Display order on homepage (1 = first slide, 2 = second, 3 = third).",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1).max(20),
    }),
  ],
  orderings: [
    {
      title: "Slide Order (1 → N)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "productName",
      order: "order",
      media: "image",
    },
    prepare({ title, order, media }) {
      return {
        title: title || "Untitled Slide",
        subtitle: order ? `Slide #${order}` : "Unordered",
        media,
      };
    },
  },
});
