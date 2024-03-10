import { Vector2 } from "@toshusai/cmpui";

export function cross(point1: Vector2, point2: Vector2): number {
  return point1.x * point2.y - point1.y * point2.x;
}
