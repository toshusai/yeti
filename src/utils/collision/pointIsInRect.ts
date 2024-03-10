export function pointIsInRect(
  x: number,
  y: number,
  rect: { x: number; y: number; width: number; height: number },
) {
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}
