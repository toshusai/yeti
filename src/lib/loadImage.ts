import { ImageEffect } from "../models/ImageEffect";

const imgMap = new Map<string, HTMLImageElement>();

export function loadImage(node: ImageEffect, url: string) {
  const cached = imgMap.get(url);
  if (cached) {
    node.element = cached;
    return;
  }
  const element = document.createElement("img");
  element.crossOrigin = "anonymous";
  element.src = url;

  imgMap.set(url, element);

  node.element = element;
}
