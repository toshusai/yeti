import { useEffect } from "react";

export function useUpdate(update: () => void) {
  useEffect(() => {
    let i = 0;
    const frameRequest = () => {
      update();
      i = requestAnimationFrame(frameRequest);
    };

    i = requestAnimationFrame(frameRequest);
    return () => {
      cancelAnimationFrame(i);
    };
  }, [update]);
}
