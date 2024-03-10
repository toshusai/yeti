import { degToRad } from "@toshusai/cmpui";

export function rectToPolygon(
  cx: number,
  cy: number,
  w: number,
  h: number,
  angle: number,
): [number, number][] {
  const rad = degToRad(angle);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const x1 = cx + w / 2;
  const y1 = cy + h / 2;
  const x2 = cx - w / 2;
  const y2 = cy + h / 2;
  const x3 = cx - w / 2;
  const y3 = cy - h / 2;
  const x4 = cx + w / 2;
  const y4 = cy - h / 2;

  const x1r = cos * (x1 - cx) - sin * (y1 - cy) + cx;
  const y1r = sin * (x1 - cx) + cos * (y1 - cy) + cy;
  const x2r = cos * (x2 - cx) - sin * (y2 - cy) + cx;
  const y2r = sin * (x2 - cx) + cos * (y2 - cy) + cy;
  const x3r = cos * (x3 - cx) - sin * (y3 - cy) + cx;
  const y3r = sin * (x3 - cx) + cos * (y3 - cy) + cy;
  const x4r = cos * (x4 - cx) - sin * (y4 - cy) + cx;
  const y4r = sin * (x4 - cx) + cos * (y4 - cy) + cy;

  return [
    [x1r, y1r],
    [x2r, y2r],
    [x3r, y3r],
    [x4r, y4r],
  ];
}
