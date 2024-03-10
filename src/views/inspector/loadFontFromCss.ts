const map = new Map<string, string>();
export function loadFontFromCss(url: string) {
  if (map.has(url)) return;

  const link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  document.head.appendChild(link);

  map.set(url, url);
}
