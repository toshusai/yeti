import { Grid, Ruler } from "@toshusai/cmpui";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { GlobalStateContext } from "../../lib/GlobalStateContext";
import { View } from "../../models/View";
import { useGridSize } from "./lib/useGridSize";

export const Rulers = observer((props: { view: View }) => {
  const gridSize = useGridSize(props.view.scale);
  const { editorState } = useContext(GlobalStateContext);
  const showGrid = editorState.view.showGrid;
  const showRulers = editorState.view.showRulers;
  // 1px for adjustment
  const rulerOffset = showRulers ? 25 : 0;
  return (
    <>
      {showGrid && (
        <Grid
          style={{
            pointerEvents: "none",
            left: rulerOffset,
            top: rulerOffset,
          }}
          offsetX={props.view.x % gridSize}
          offsetY={props.view.y % gridSize}
          sizeX={gridSize}
          sizeY={gridSize}
        />
      )}

      {showRulers && (
        <>
          <Ruler
            orientation="vertical"
            offset={(-props.view.y - 24) / props.view.scale}
            pxPerUnit={props.view.scale}
            className="!absolute left-0 top-0"
            style={{
              background: "white",
            }}
          />
          <Ruler
            offset={(-props.view.x - 24) / props.view.scale}
            pxPerUnit={props.view.scale}
            className="!absolute top-0"
            style={{
              background: "white",
            }}
          />
        </>
      )}
    </>
  );
});
