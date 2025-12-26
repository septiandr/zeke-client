export function parseTopupSlug(slug: string) {
  const parts = slug.split("-");
  const categorySlug = parts.pop()!; // games
  const brandSlug = parts.join("-"); // mobile-legends
  return { brandSlug, categorySlug };
}
