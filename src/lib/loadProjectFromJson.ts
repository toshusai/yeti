import { Project } from "../models/Project";
import { loadFontFromCss } from "../views/inspector/loadFontFromCss";
import { loadImage } from "./loadImage";

export function loadProjectFromJson(json: string) {
  const project: Project = JSON.parse(json);

  project.layers.forEach((layer) => {
    layer.effects.forEach((effect) => {
      if (effect.type === "text") {
        const asset = project.assets.find(
          (asset) => asset.id === effect.assetId,
        );
        if (!asset) return;
        loadFontFromCss(asset.url);
      } else if (effect.type === "image") {
        const asset = project.assets.find(
          (asset) => asset.id === effect.assetId,
        );
        if (!asset) return;
        loadImage(effect, asset.url);
      }
    });
  });
  return project;
}
