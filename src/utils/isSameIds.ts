export function isSameIds(a: string[], b: string[]) {
  return [...a].sort().join(",") === [...b].sort().join(",");
}
