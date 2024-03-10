import { SelectItem } from "@toshusai/cmpui";
import { useEffect } from "react";
import { loadFontFromCss } from "./loadFontFromCss";

export function FontRender(props: {
  value: string;
  url: string;
  family: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    loadFontFromCss(props.url);
  }, [props.url]);

  return (
    <SelectItem value={props.value}>
      <div
        style={{
          fontFamily: props.family,
        }}
      >
        {props.children}
      </div>
    </SelectItem>
  );
}
