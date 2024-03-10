import {
  CanvasView,
  SelectRect,
  clamp,
  createDragHandler,
  useSelectRectHandler,
} from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useRef } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { getTextEffect } from "../../lib/getTextEffect";
import { getTransformOrError } from "../../lib/getTransformOrError";
import { newLayerWithText } from "../../lib/newLayerWithText";
import { useMetaKeyLayerSelect } from "../../lib/useMetaKeyLayerSelect";
import { useUndo } from "../../lib/useUndo";
import { isSameIds } from "../../utils/isSameIds";
import { Gizmos } from "./Gizmos";
import { Rulers } from "./Rulers";
import { defaultTextToRect } from "./lib/defaultTextToRect";
import { pointSelect } from "./lib/pointSelect";
import { useCanvasState } from "./lib/useCanvasState";
import { useImageDropHandler } from "./lib/useImageDropHandler";
import { useRectSelect } from "./lib/useRectSelect";
import { useTextToRect } from "./lib/useTextToRect";
import { useUpdateRender } from "./lib/useUpdateRender";
import { useViewReset } from "./lib/useViewReset";

export const Canvas = observer(() => {
  const props = useContext(GlobalStateContext);
  const editorState = props.editorState;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;
    ctxRef.current = canvasRef.current.getContext("2d");
  }, [canvasRef]);

  const { innerMode, handleKeyDown, handlePointerEnter } = useCanvasState();

  const { onDrop, onDragOver } = useImageDropHandler();

  const view = editorState.canvasView;

  const { rect, onPointerDown: onPointerDownForSelectRect } =
    useSelectRectHandler();

  const metaKeyLayerSelect = useMetaKeyLayerSelect();

  const { start, commit } = useUndo();

  useUpdateRender(ctxRef);
  useViewReset(view, canvasRef);
  useRectSelect(view, rect);

  const onPointerDownForCreateText = useMemo(
    () =>
      createDragHandler({
        onUp: action((e, __, prev) => {
          if (prev !== undefined) return;
          const el = e.target as HTMLElement;
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left - view.x) / view.scale;
          const y = (e.clientY - rect.top - view.y) / view.scale;

          const newText = newLayerWithText();
          const tEf = getTransformOrError(newText);
          tEf.x = x;
          tEf.y = y;
          const texEf = getTextEffect(newText);

          start();
          props.project.layers = [...props.project.layers, newText];
          editorState.selectedLayerIds = [newText.id];
          props.editorState.toolMode = "default";
          commit();
          requestAnimationFrame(() => {
            document.getElementById(`${texEf?.id}-text`)?.focus();
          });
        }),
        options: {
          disableCapture: true,
        },
      }),
    [
      commit,
      editorState,
      props.editorState,
      props.project,
      start,
      view.scale,
      view.x,
      view.y,
    ],
  );

  const rulerOffset = editorState.view.showRulers ? 24 : 0;

  const textToRect = useTextToRect();
  const getHitLayers = useMemo(
    () => (x: number, y: number) => {
      if (!props.vCanvas?.offscreenCtx) return [];
      const ctx = props.vCanvas.offscreenCtx;
      return pointSelect(
        x,
        y,
        props.project.layers,
        view,
        textToRect ?? ((t, e) => defaultTextToRect(ctx, t, e)),
      );
    },
    [props.project.layers, props.vCanvas?.offscreenCtx, textToRect, view],
  );

  const handlePointerDown = useMemo(
    () =>
      action((e: React.PointerEvent<HTMLElement>) => {
        const el = e.target as HTMLElement;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (props.editorState.toolMode === "text" && innerMode === "default") {
          onPointerDownForCreateText(e);
          return;
        }
        if (innerMode !== "default") return;

        if (!props.vCanvas?.offscreenCtx) return;
        const hitLayers = getHitLayers(x, y);

        if (hitLayers.length > 0) {
          if (e.metaKey) {
            metaKeyLayerSelect(hitLayers[0].id);
          } else {
            editorState.selectedLayerIds = [hitLayers[0].id];
          }
          start();
          const newHandler = createDragHandler({
            onMove: action((_, __, move) => {
              const selectedLayers = props.project.layers.filter((layer) =>
                editorState.selectedLayerIds.includes(layer.id),
              );
              selectedLayers.forEach((layer) => {
                const transform = getTransformOrError(layer);
                transform.x += move.deltaX / view.scale;
                transform.y += move.deltaY / view.scale;
              });
            }),
            onUp: (_, __, prev) => {
              if (prev === undefined) return;
              commit();
            },
          });
          newHandler(e);
        } else {
          editorState.selectedLayerIds = [];
          onPointerDownForSelectRect(e);
        }
      }),
    [
      commit,
      editorState,
      getHitLayers,
      innerMode,
      metaKeyLayerSelect,
      onPointerDownForCreateText,
      onPointerDownForSelectRect,
      props.editorState.toolMode,
      props.project.layers,
      props.vCanvas?.offscreenCtx,
      start,
      view.scale,
    ],
  );

  /**
   * if already selected layer and click on the gizmo, then select next layer.
   */
  const handlePointerDownCapture = useMemo(
    () => (e: React.PointerEvent<HTMLElement>) => {
      const el = e.currentTarget as HTMLElement;
      /**
       * startIds is check for selected layer is not changed.
       * because change will emit onUp event but onPointerDownBubble will be called before onUp.
       */
      let captureSelectedLayerIds: string[] = [];
      createDragHandler<undefined>({
        onDown: () => {
          captureSelectedLayerIds = editorState.selectedLayerIds;
          // for type. no meaning for logic.
          return undefined;
        },
        onUp: action((e, _: undefined, prev) => {
          if (prev !== undefined) {
            return;
          }
          if (
            !isSameIds(captureSelectedLayerIds, editorState.selectedLayerIds)
          ) {
            return;
          }
          if (editorState.toolMode === "text" && innerMode === "default") {
            return;
          }
          if (innerMode !== "default") return;
          if (!props.vCanvas?.offscreenCtx) return;

          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const hitLayers = getHitLayers(x, y);
          if (!hitLayers) return;
          if (editorState.selectedLayerIds.length === 0) return;
          const currentIndex = hitLayers.findIndex(
            (layer) => layer.id === editorState.selectedLayerIds[0],
          );
          const next =
            currentIndex + 1 > hitLayers.length - 1 ? 0 : currentIndex + 1;

          editorState.selectedLayerIds = [hitLayers[next].id];
        }),
      })(e);
    },
    [editorState, getHitLayers, innerMode, props.vCanvas?.offscreenCtx],
  );

  return (
    <div ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      <div
        style={{
          position: "absolute",
          top: rulerOffset,
          left: rulerOffset,
          width: `calc(100% - ${rulerOffset}px)`,
          height: `calc(100% - ${rulerOffset}px)`,
          background: "lightgray",
          overflow: "hidden",
        }}
        onPointerDown={handlePointerDown}
        onPointerDownCapture={handlePointerDownCapture}
      >
        <CanvasView
          view={view}
          onKeyDown={handleKeyDown}
          onPointerEnter={handlePointerEnter}
          onChangeView={action((arg) => {
            const pxX = arg.x / view.scale;
            view.x = clamp(pxX, -5000, 5000) * view.scale;
            const pxY = arg.y / view.scale;
            view.y = clamp(pxY, -5000, 5000) * view.scale;
            view.scale = arg.scale;
          })}
          maxScale={50}
          minScale={0.1}
          mode={innerMode}
          style={
            props.editorState.toolMode === "text" && innerMode === "default"
              ? {
                  cursor: "text",
                }
              : undefined
          }
          content={
            <canvas
              ref={canvasRef}
              style={{
                background: "white",
                imageRendering: "pixelated",
              }}
              width={props.project.canvasWidth}
              height={props.project.canvasHeight}
            />
          }
        >
          <Gizmos view={view} mode={innerMode} />
        </CanvasView>
      </div>
      <Rulers view={view} />
      {rect && innerMode === "default" && (
        <SelectRect
          x={rect.x + rulerOffset}
          y={rect.y + rulerOffset}
          width={rect.width}
          height={rect.height}
        />
      )}
    </div>
  );
});
