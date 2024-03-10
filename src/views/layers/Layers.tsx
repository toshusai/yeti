import { TreeView } from "@toshusai/cmpui";
import { action } from "mobx";
import { observer } from "mobx-react-lite";
import { useCallback, useContext, useMemo } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { LayerListItem } from "./LayerListItem";

export const Layers = observer(() => {
  const globalState = useContext(GlobalStateContext);
  const project = globalState.project;

  const handleSingleOrderChange = useMemo(
    () =>
      action((srcId: string, distId: string, type: 0 | 1 | 2 | null) => {
        if (type === 0) {
          const srcIndex = project.layers.findIndex((l) => l.id === srcId);
          const distIndex = project.layers.findIndex((l) => l.id === distId);

          const layers = [...project.layers];
          layers.splice(distIndex, 0, layers.splice(srcIndex, 1)[0]);
          project.layers = layers;
        } else if (type === 1) {
          const srcIndex = project.layers.findIndex((l) => l.id === srcId);
          const distIndex = project.layers.findIndex((l) => l.id === distId);
          const layers = [...project.layers];
          const add = srcIndex < distIndex ? 0 : 1;
          const sp = layers.splice(srcIndex, 1)[0];
          layers.splice(distIndex + add, 0, sp);
          project.layers = layers;
        }
      }),
    [project],
  );

  const handleOrderChange = useCallback(
    (src: string, dist: string, type: 0 | 1 | 2 | null) => {
      const selectedIds = globalState.editorState.selectedLayerIds;
      if (selectedIds.length > 1) {
        for (const id of selectedIds) {
          handleSingleOrderChange(id, dist, type);
        }
      } else {
        handleSingleOrderChange(src, dist, type);
      }
    },
    [globalState.editorState.selectedLayerIds, handleSingleOrderChange],
  );

  return (
    <div className="flex flex-col w-full overflow-auto">
      <ObservableTreeView
        items={globalState.project.layers}
        render={(props) => {
          return <LayerListItem layer={props.item} />;
        }}
        onOrderChange={handleOrderChange}
      />
    </div>
  );
});

const ObservableTreeView = observer(TreeView);
