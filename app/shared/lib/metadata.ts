export interface PageMetadata {
  title: string;
  description: string;
}

export function buildMetadata(metadata?: PageMetadata) {
  const title = metadata?.title ?? "Seqgen";
  const description = metadata?.description ?? "";
  const image = "/og-image.png";

  return [
    { title },
    { name: "description", content: description },
    { name: "theme-color", content: "#080b12" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    {
      property: "og:image:alt",
      content: "Seqgen cryptographic generators and text utilities",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    {
      name: "twitter:image:alt",
      content: "Seqgen cryptographic generators and text utilities",
    },
  ];
}
