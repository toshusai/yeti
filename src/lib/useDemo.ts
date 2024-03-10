import { action } from "mobx";
import { useContext, useEffect } from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import { loadProjectFromJson } from "./loadProjectFromJson";

export function useDemo() {
  const globalState = useContext(GlobalStateContext);
  useEffect(() => {
    fetch("/yeti/demo/project.json").then(async (res) => {
      const project = await res.json();
      action(() => {
        globalState.project = loadProjectFromJson(
          JSON.stringify(project.project),
        );
        globalState.editorState = project.editorState;
      })();
    });
  }, []);
}
