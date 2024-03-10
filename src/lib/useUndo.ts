import { useCallback, useContext, useRef } from "react";
import { GlobalStateContext } from "./GlobalStateContext";
import { UndoManager } from "./UndoManager";
import { stringifyProject } from "./stringifyProject";

export function useUndo() {
  const { project } = useContext(GlobalStateContext);

  const tmp = useRef(stringifyProject(project));
  const start = useCallback(() => {
    tmp.current = stringifyProject(project);
  }, [project]);

  const commit = useCallback(() => {
    if (tmp.current === stringifyProject(project)) return;
    UndoManager.main.add(() => JSON.parse(tmp.current));
  }, [project]);

  const undo = useCallback(() => {
    UndoManager.main.undo(() => {
      return JSON.parse(tmp.current);
    });
  }, []);

  const redo = useCallback(() => {
    UndoManager.main.redo();
  }, []);

  return { start, commit, undo, redo };
}
