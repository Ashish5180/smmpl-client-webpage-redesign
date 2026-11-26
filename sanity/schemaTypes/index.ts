import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import { heroSlide } from "./heroSlide";
import { industry } from "./industry";
import { product } from "./product";
import { clientLogo } from "./client";
import { post } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, heroSlide, industry, product, clientLogo, post],
};
