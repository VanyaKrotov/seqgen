export interface PageMetadata {
  title: string;
  description: string;
}

export function buildMetadata(metadata?: PageMetadata) {
  const title = metadata?.title ?? "Seqgen";
  const description = metadata?.description ?? "";

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: "#080b12" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}
