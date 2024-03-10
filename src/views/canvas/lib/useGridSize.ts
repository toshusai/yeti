import { useMemo } from "react";

export function useGridSize(scale: number) {
  return useMemo(
    () =>
      scale > 8
        ? scale
        : scale > 3.2
          ? scale * 10
          : scale > 0.64
            ? scale * 50
            : scale * 100,
    [scale],
  );
}
