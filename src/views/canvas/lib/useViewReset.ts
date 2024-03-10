import { action } from "mobx";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { View } from "../../../models/View";

export function useViewReset(
  view: View,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) {
  const { project } = useContext(GlobalStateContext);
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const parent = el.parentElement?.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();

    action(() => {
      view.x = parentRect.width / 2 - project.canvasWidth / 2;
      view.y = parentRect.height / 2 - project.canvasHeight / 2;
    })();
  }, [canvasRef, project.canvasHeight, project.canvasWidth, view]);
}
