import { Button, Modal, Select, SelectItem } from "@toshusai/cmpui";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { useExportCanvas } from "../../../lib/useExportCanvas";
import { WidthHeightInput } from "../../WidthHeightInput";
import { extMap } from "./extMap";

export function ExportImageModal(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { project } = useContext(GlobalStateContext);
  const [width, setWidth] = useState(project.canvasWidth);
  const [height, setHeight] = useState(project.canvasHeight);

  const [exportType, setExportType] = useState<"png" | "jpeg" | "webp">("png");

  const exportImage = useExportCanvas();

  useEffect(() => {
    if (props.open) {
      setWidth(project.canvasWidth);
      setHeight(project.canvasHeight);
    }
  }, [project.canvasWidth, project.canvasHeight, props.open]);

  return (
    <Modal title="Export Image" open={props.open} onClose={props.onClose}>
      <WidthHeightInput
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
      />
      <div className="flex flex gap-4 items-center p-8 justify-center w-full">
        <Select
          className="w-full"
          label="Extension"
          value={exportType}
          onChange={(value) => {
            setExportType(value as "png" | "jpeg" | "webp");
          }}
        >
          {Object.entries(extMap).map(([key, label]) => {
            return (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Button
          onClick={() => {
            exportImage(exportType, width, height);
            props.onClose();
          }}
        >
          Export
        </Button>
      </div>
    </Modal>
  );
}
