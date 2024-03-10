import { ViewMode } from "@toshusai/cmpui";

export type ToolType = ViewMode | "text";

export type EditorState = {
  toolMode: ToolType;
  selectedLayerIds: string[];

  view: {
    showGrid: boolean;
    showRulers: boolean;
  };

  canvasView: {
    x: number;
    y: number;
    scale: number;
  };
};
