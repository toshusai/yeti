import { MenuBarItem } from "@toshusai/cmpui";
import { action } from "mobx";
import { useContext } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { stringifyProject } from "../../../lib/stringifyProject";
import { downloadUrl } from "../../../utils/io/downloadUrl";
import { ShortcutListItem } from "../../ShortcutListItem";

export function SaveProjectListItem() {
  const downloadProjectFile = useDownloadProjectFile();
  return (
    <ShortcutListItem
      shortcut="⌘+S"
      as={MenuBarItem}
      onClick={downloadProjectFile}
    >
      Save Project
    </ShortcutListItem>
  );
}

function useDownloadProjectFile() {
  const globalState = useContext(GlobalStateContext);
  return action(() => {
    const url = `data:application/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({
        project: JSON.parse(stringifyProject(globalState.project)),
        editorState: globalState.editorState,
      }),
    )}`;
    downloadUrl(url, "project.json");
  });
}
