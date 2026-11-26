import { defineArrayMember, defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  groups: [
    { name: "leadership", title: "About Leadership", default: true },
    { name: "stats", title: "Homepage Stats" },
    { name: "contact", title: "Contact & Socials" },
  ],
  fields: [
    defineField({
      name: "leaders",
      title: "Leadership Portraits (About Section)",
      type: "array",
      group: "leadership",
      description: "Two leadership portraits shown in the About SMMIPL section.",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Designation / Role",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "image",
              title: "Portrait Photo",
              type: "image",
              description: "Recommended: 4:5 portrait photo (at least 600x750px).",
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
              name: "isPrimary",
              title: "Highlight Role in Red",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "role", media: "image" },
          },
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Trusted By Stats (3 Metrics)",
      type: "array",
      group: "stats",
      description: "Three animated numbers shown above the Client Logos marquee.",
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              type: "number",
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "suffix",
              type: "string",
              initialValue: "+",
            }),
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare({ value, suffix, label }) {
              return {
                title: `${value ?? ""}${suffix ?? ""} ${label ?? ""}`.trim(),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "phonePrimary",
      title: "Primary Phone",
      type: "string",
      group: "contact",
      initialValue: "+91-9266125704",
    }),
    defineField({
      name: "phoneSecondary",
      title: "Secondary Phone",
      type: "string",
      group: "contact",
      initialValue: "+91-9012535955",
    }),
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      group: "contact",
      initialValue: "info@marutiindia.co.in",
    }),
    defineField({
      name: "address",
      title: "Factory Address",
      type: "text",
      rows: 2,
      group: "contact",
      initialValue:
        "Plot No. 154K, Sector 7, IMT Manesar, Gurugram, Haryana - 122 052",
    }),
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn", type: "url" }),
        defineField({ name: "x", title: "X (Twitter)", type: "url" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
