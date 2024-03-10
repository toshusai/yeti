import { action } from "mobx";
import { useCallback, useContext, useEffect } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { VCanvas, tmpCtx } from "../../../models/VCanvas";
import { useUpdate } from "../../../utils/useUpdate";
import { renderImage } from "./renderImage";
import { renderTextEffect } from "./renderTextEffect";

let mainLoopCtx: CanvasRenderingContext2D | null = null;

export function useUpdateRender(
  ctxRef: React.RefObject<CanvasRenderingContext2D>,
) {
  const globalState = useContext(GlobalStateContext);

  const update = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    if (!mainLoopCtx) {
      mainLoopCtx = ctx;
    }
    if (mainLoopCtx !== ctx) return;
    globalState.vCanvas?.draw();
    const offCtx = globalState.vCanvas?.offscreenCtx;
    if (!offCtx) return;
    ctx.drawImage(offCtx.canvas, 0, 0);
  }, [ctxRef, globalState.vCanvas]);

  useUpdate(update);

  useEffect(() => {
    globalState.vCanvas?.resize(
      globalState.project.canvasWidth,
      globalState.project.canvasHeight,
    );
  }, [
    globalState.project.canvasWidth,
    globalState.project.canvasHeight,
    globalState.vCanvas,
  ]);

  useEffect(
    () =>
      action(() => {
        if (ctxRef.current === null) return;
        if (globalState.vCanvas) return;
        globalState.vCanvas = new VCanvas();
        const offCtx = globalState.vCanvas.offscreenCtx;
        if (!offCtx) return;

        globalState.vCanvas.onDraw = () => {
          for (let i = globalState.project.layers.length - 1; i >= 0; i--) {
            const layer = globalState.project.layers[i];
            tmpCtx.clearRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
            layer.effects.forEach((effect) => {
              if (effect.type === "text") {
                renderTextEffect(tmpCtx, effect, layer, globalState.project);
              } else if (effect.type === "image") {
                renderImage(tmpCtx, effect, layer);
              }
            });
            offCtx.drawImage(tmpCtx.canvas, 0, 0);
          }
        };

        globalState.vCanvas.resize(
          globalState.project.canvasWidth,
          globalState.project.canvasHeight,
        );
      })(),
    [ctxRef, globalState],
  );
}
