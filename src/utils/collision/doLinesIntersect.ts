import { Vector2 } from "@toshusai/cmpui";
import { cross } from "../math/cross";

export function doLinesIntersect(
  a: Vector2,
  b: Vector2,
  c: Vector2,
  d: Vector2,
): boolean {
  const R = { x: b.x - a.x, y: b.y - a.y };
  const S = { x: d.x - c.x, y: d.y - c.y };

  const denominator = cross(R, S);
  if (denominator === 0) {
    return false;
  }

  const u = cross({ x: c.x - a.x, y: c.y - a.y }, R) / denominator;
  const t = cross({ x: c.x - a.x, y: c.y - a.y }, S) / denominator;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}
