import { useContext } from "react";
import { GlobalStateContext } from "./GlobalStateContext";

export function useEditorState() {
  return useContext(GlobalStateContext).editorState;
}
