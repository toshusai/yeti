import { action } from "mobx";
import { useCallback, useContext } from "react";
import { GlobalStateContext } from "./GlobalStateContext";

export function useMetaKeyLayerSelect() {
  const { editorState } = useContext(GlobalStateContext);

  return useCallback(
    (layerId: string) =>
      action(() => {
        if (editorState.selectedLayerIds.includes(layerId)) {
          editorState.selectedLayerIds = editorState.selectedLayerIds.filter(
            (id) => id !== layerId,
          );
        } else {
          editorState.selectedLayerIds = [
            ...editorState.selectedLayerIds,
            layerId,
          ];
        }
      })(),
    [editorState],
  );
}
