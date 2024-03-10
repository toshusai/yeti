import { ListItem } from "@toshusai/cmpui";
import "./index.css";

export function ShortcutListItem({
  children,
  shortcut,
  disabled,
  as: Component = ListItem,
  ...rest
}: {
  children: React.ReactNode;
  shortcut?: string;
  disabled?: boolean;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLLIElement>) {
  return (
    <Component
      disabled={disabled}
      className="shortcut-list-item w-full min-w-[192px]"
      {...rest}
    >
      <div style={{ width: "100%" }}>{children}</div>
      {shortcut && (
        <div
          style={{
            fontSize: "10px",
            marginLeft: "8px",
          }}
        >
          {shortcut}
        </div>
      )}
    </Component>
  );
}
