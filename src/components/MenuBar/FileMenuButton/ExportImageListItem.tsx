import { MenuBarItem, MenuBarSubButton } from "@toshusai/cmpui";
import { ExportExt, useExportCanvas } from "../../../lib/useExportCanvas";
import { extMap } from "./extMap";

export function ExportImageListItem() {
  const exportImage = useExportCanvas();

  return (
    <MenuBarSubButton
      content={Object.entries(extMap).map(([ext, label]) => (
        <MenuBarItem key={ext} onClick={() => exportImage(ext as ExportExt)}>
          {label}
        </MenuBarItem>
      ))}
    >
      Quick Export Image
    </MenuBarSubButton>
  );
}
