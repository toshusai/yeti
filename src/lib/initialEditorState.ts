import { EditorState } from "../models/EditorState";

export function initialEditorState(): EditorState {
  return {
    toolMode: "default",
    selectedLayerIds: [],
    view: {
      showGrid: true,
      showRulers: true,
    },
    canvasView: {
      x: 0,
      y: 0,
      scale: 1,
    },
  };
}
