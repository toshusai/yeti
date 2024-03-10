import { action } from "mobx";
import { useContext } from "react";
import { ToastContext } from "../../../components/ToastProvider";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { newImageAsset } from "../../../lib/newImageAsset";
import { newLayerWithImage } from "../../../lib/newLayerWithImage";
import { Asset } from "../../../models/Asset";
import { Layer } from "../../../models/Layer";
import { createFileDropHandlers } from "./createFileDropHandlers";

export function useImageDropHandler() {
  const { editorState, project } = useContext(GlobalStateContext);
  const { showToast } = useContext(ToastContext);
  const { onDrop, onDragOver } = createFileDropHandlers(async (files) => {
    const promises: Promise<void>[] = [];
    const newLayers: Layer[] = [];
    const newAssets: Asset[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const img = new Image();
      const src = URL.createObjectURL(file);
      img.src = src;
      promises.push(
        new Promise<void>((resolve) => {
          img.onload = () => {
            const asset = newImageAsset({
              name: file.name,
              src: "path" in file ? `file://${file.path}` : src,
            });
            newAssets.push(asset);

            const imgNode = newLayerWithImage({
              img,
              asset,
              name: file.name,
            });
            newLayers.push(imgNode);

            resolve();
          };
          img.onerror = () => {
            showToast("Failed to load image");
            resolve();
          };
        }),
      );
    }
    await Promise.all(promises);
    action(() => {
      project.layers.push(...newLayers);
      project.assets.push(...newAssets);
      editorState.selectedLayerIds = newLayers.map((l) => l.id);
    })();
  });

  return { onDrop, onDragOver };
}
