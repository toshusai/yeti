import { useContext } from "react";
import { GlobalStateContext } from "../../../lib/GlobalStateContext";
import { TextEffect } from "../../../models/TextEffect";
import { TransformEffect } from "../../../models/TransformEffect";

export function useTextToRect() {
  const globalState = useContext(GlobalStateContext);

  return (text: TextEffect, transform: TransformEffect) => {
    const ctx = globalState.vCanvas?.offscreenCtx;
    if (!ctx) return null;

    const asset = globalState.project.assets.find(
      (asset) => asset.id === text.assetId,
    );

    const name = asset ? asset.name : "Arial";
    ctx.font = `${text.fontSize}px ${name}`;
    const width = ctx.measureText(text.text).width;
    const height = text.fontSize;
    return {
      x: transform.x,
      y: transform.y,
      width,
      height,
    };
  };
}
