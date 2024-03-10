import { Tab } from "./Tab";

import "./index.css";

export function Panel(props: {
  tabs: {
    id: string;
    title: string;
    component: React.ReactNode;
  }[];
  activeTabId: string;
  onChangeTab?: (id: string) => void;
}) {
  return (
    <div className="panel--root">
      <div className="panel--header">
        {props.tabs.map((tab) => (
          <Tab key={tab.id} active={tab.id === props.activeTabId}>
            {tab.title}
          </Tab>
        ))}
      </div>
      <div className="panel--content">
        {props.tabs.find((tab) => tab.id === props.activeTabId)?.component}
      </div>
    </div>
  );
}
