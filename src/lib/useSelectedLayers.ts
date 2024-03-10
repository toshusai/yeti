import { useContext } from "react";
import { GlobalStateContext } from "./GlobalStateContext";

export function useSelectedLayers() {
  const { editorState, project } = useContext(GlobalStateContext);

  return project.layers.filter((layer) =>
    editorState.selectedLayerIds.includes(layer.id),
  );
}
