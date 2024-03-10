import { memo } from "react";

import "./index.css";

export const Tab = memo(function Tab(props: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className="tab--root"
      data-selected={props.active}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
});
