import { MenuBarItem } from "@toshusai/cmpui";
import { action } from "mobx";
import { useContext } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { loadProjectFromJson } from "../../../lib/loadProjectFromJson";
import { openFile } from "../../../utils/io/openFile";
import { ShortcutListItem } from "../../ShortcutListItem";

export function OpenProjectListItem() {
  const openProjectFile = useOpenProjectFile();
  return (
    <ShortcutListItem as={MenuBarItem} onClick={openProjectFile} shortcut="⌘+O">
      Open Project
    </ShortcutListItem>
  );
}

function useOpenProjectFile() {
  const globalState = useContext(GlobalStateContext);
  return action(async () => {
    openFile(".json", async (files) => {
      const json = await files?.[0].text();

      if (!json) return;
      globalState.project = loadProjectFromJson(json);
    });
  });
}
