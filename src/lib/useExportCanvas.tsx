import { action } from "mobx";
import { useContext, useMemo } from "react";
import { downloadBlob } from "../utils/io/downloadBlob";
import { GlobalStateContext } from "./GlobalStateContext";

export type ExportExt = "png" | "jpeg" | "webp";

export function useExportCanvas() {
  const globalState = useContext(GlobalStateContext);
  return useMemo(
    () =>
      action(
        (
          ext: ExportExt,
          width: number = globalState.project.canvasWidth,
          height: number = globalState.project.canvasHeight,
        ) => {

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          if(!globalState.vCanvas?.offscreenCanvas ) return;
          ctx.drawImage(globalState.vCanvas?.offscreenCanvas, 0, 0, width, height);

          canvas.toBlob((blob) => {
            if(!blob) return;
            downloadBlob(blob, `image.${ext}`);
          }, `image/${ext}`);
       },
      ),
    [globalState.project.canvasHeight, globalState.project.canvasWidth, globalState.vCanvas?.offscreenCanvas],
  );
}
