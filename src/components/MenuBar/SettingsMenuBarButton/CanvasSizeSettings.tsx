import { Button } from "@toshusai/cmpui";
import { action } from "mobx";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { WidthHeightInput } from "../../WidthHeightInput";

export function CanvasSizeSettings(props: {
  open: boolean;
}) {
  const { project, vCanvas } = useContext(GlobalStateContext);
  const [width, setWidth] = useState(project.canvasWidth);
  const [height, setHeight] = useState(project.canvasHeight);

  useEffect(() => {
    if (props.open) {
      setWidth(project.canvasWidth);
      setHeight(project.canvasHeight);
    }
  }, [project.canvasWidth, project.canvasHeight, props.open]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <WidthHeightInput
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
      />

      <Button
        onClick={action(() => {
          project.canvasWidth = width;
          project.canvasHeight = height;
          vCanvas?.resize(width, height);
        })}
      >
        Save
      </Button>
    </div>
  );
}
