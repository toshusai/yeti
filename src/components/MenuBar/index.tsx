import { MenuBar as CmpUIMenuBar } from "@toshusai/cmpui";
import { EditMenuBarButton } from "./EditMenuButton";
import { FileMenuButton } from "./FileMenuButton";
import { SettingsMenuBarButton } from "./SettingsMenuBarButton";
import { ViewMenuBarButton } from "./ViewMenuBarButton";

export function MenuBar() {
  return (
    <CmpUIMenuBar>
      <FileMenuButton />
      <EditMenuBarButton />
      <ViewMenuBarButton />
      <SettingsMenuBarButton />
    </CmpUIMenuBar>
  );
}
