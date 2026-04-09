import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const blogPages = await getCollection("blog");
  return rss({
    title: "femphilic",
    description: "a home to my projects, portfolio, and more :3",
    site: context.site ?? "https://femphilic.com",
    trailingSlash: false,
    items: [
      ...blogPages.map((page) => ({
        ...page.data,
        link: `/blog/${page.id}`,
      })),
    ],
  });
}
