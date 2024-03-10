import { ViewMode, createKeyDownUpHandler } from "@toshusai/cmpui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useEditorState } from "../../../lib/useEditorState";

function usePointerEnterFocus() {
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.focus({
      preventScroll: true,
    });
  }, []);
}

export function useCanvasState() {
  const editor = useEditorState();
  const [keyStack, setKeyStack] = useState<string[]>([]);

  const [innerMode, setInnerMode] = useState<ViewMode>("default");

  useEffect(() => {
    if (editor.toolMode === "text") {
      setInnerMode("default");
      return;
    }
    setInnerMode(editor.toolMode);
  }, [editor.toolMode]);

  const downBeforeMode = useRef<ViewMode>("default");

  const handleKeyDowns = useMemo(
    () =>
      [" ", "Alt", "Shift"].map((key) =>
        createKeyDownUpHandler(key, {
          onDown: (e) => {
            e.preventDefault();
            setKeyStack((keyStack) => {
              if (keyStack.length === 0) {
                downBeforeMode.current = innerMode;
              }
              if (keyStack.includes(key)) {
                return keyStack;
              }
              return [...keyStack, key];
            });
          },
          onUp: () => {
            setKeyStack((keyStack) => keyStack.filter((k) => k !== key));
          },
        }),
      ),
    [downBeforeMode, innerMode],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleKeyDowns.map((handler) => handler(e));
  };

  const handlePointerEnter = usePointerEnterFocus();

  const mode = useMemo(() => {
    if (keyStack.includes(" ")) {
      return "pan";
    }
    if (keyStack.includes("Alt") && keyStack.includes("Shift")) {
      return "zoom-out";
    }
    if (keyStack.includes("Alt")) {
      return "zoom-in";
    }
    return downBeforeMode.current;
  }, [keyStack]);

  useEffect(() => {
    setInnerMode(mode);
  }, [mode]);

  return {
    innerMode,
    handleKeyDown,
    handlePointerEnter,
  };
}
