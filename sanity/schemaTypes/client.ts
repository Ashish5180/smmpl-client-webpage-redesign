import { defineField, defineType } from "sanity";
import { Building2 } from "lucide-react";

export const clientLogo = defineType({
  name: "client",
  title: "Clients",
  type: "document",
  icon: Building2,
  fields: [
    defineField({
      name: "name",
      title: "Client Company Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Company Logo (PNG or SVG)",
      type: "image",
      description: "Transparent PNG or SVG works best. Leave empty to show company name pill.",
      options: {
        accept: "image/*,.svg",
      },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Defaults to company name if left blank.",
        }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website (Optional)",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.integer().min(1).max(100),
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
    select: { title: "name", order: "order", media: "logo" },
    prepare({ title, order, media }) {
      return {
        title: title || "Untitled Client",
        subtitle: order ? `Order #${order}` : undefined,
        media,
      };
    },
  },
});
