import "./styles/global";

import { SplitPane, TooltipProvider } from "@toshusai/cmpui";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { MenuBar } from "./components/MenuBar";
import { Panel } from "./components/Panel";
import { SideNav } from "./components/SideNav";
import { ToastProvider } from "./components/ToastProvider";
import { GlobalStateContext } from "./lib/GlobalStateContext";
import { newGlobalState } from "./lib/newGlobalState";
import { useDemo } from "./lib/useDemo";
import { useRegisterSaveKeyBoardShortcut } from "./lib/useRegisterSaveKeyBoardShortcut";
import { GlobalState } from "./models/GlobalState";
import { Canvas } from "./views/canvas/Canvas";
import { Inspector } from "./views/inspector/Inspector";
import { Layers } from "./views/layers/Layers";

const AppBody = observer(() => {
  useDemo();
  useRegisterSaveKeyBoardShortcut();

  return (
    <>
      <div className="flex flex-col w-full gap-4 p-4">
        <MenuBar />
        <div
          className="flex h-full gap-4"
          style={{
            maxHeight: "calc(100vh - 32px)",
          }}
        >
          <SideNav />
          <div className="flex w-[calc(100%-32px)] h-full">
            <SplitPane type="horizontal" minSizes={["256px"]} sizes={["256px"]}>
              <SplitPane type="vertical">
                <Panel
                  activeTabId="inspector"
                  tabs={[
                    {
                      id: "inspector",
                      title: "Inspector",
                      component: <Inspector />,
                    },
                  ]}
                />
                <Panel
                  activeTabId="layers"
                  tabs={[
                    {
                      id: "layers",
                      title: "Layers",
                      component: <Layers />,
                    },
                  ]}
                />
              </SplitPane>
              <Panel
                activeTabId="canvas"
                tabs={[
                  {
                    id: "canvas",
                    title: "Canvas",
                    component: <Canvas />,
                  },
                ]}
              />
            </SplitPane>
          </div>
        </div>
      </div>
    </>
  );
});

function App() {
  const globalState: GlobalState = observable.object(newGlobalState());
  return (
    <GlobalStateContext.Provider value={globalState}>
      <TooltipProvider>
        <ToastProvider>
          <AppBody />
        </ToastProvider>
      </TooltipProvider>
    </GlobalStateContext.Provider>
  );
}

export default App;
