type RevalidationUrls = {
  currentUrl: URL;
  nextUrl: URL;
};

export function shouldRevalidateByPathOrLanguage({
  currentUrl,
  nextUrl,
}: RevalidationUrls) {
  return (
    currentUrl.pathname !== nextUrl.pathname ||
    currentUrl.searchParams.get("lng") !== nextUrl.searchParams.get("lng")
  );
}
