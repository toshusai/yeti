import { createContext } from "react";
import { GlobalState } from "../models/GlobalState";
import { initialEditorState } from "./initialEditorState";
import { initialProject } from "./initialProject";

export const GlobalStateContext = createContext<GlobalState>({
  project: initialProject(),
  editorState: initialEditorState(),
  vCanvas: null,
});
