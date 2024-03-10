import { makeAutoObservable } from "mobx";

export const tmpCtx: OffscreenCanvasRenderingContext2D = new OffscreenCanvas(
  256,
  256,
).getContext("2d") as OffscreenCanvasRenderingContext2D;

export class VCanvas {
  onDraw: () => void = () => {};
  offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(256, 256);
  offscreenCtx: OffscreenCanvasRenderingContext2D;

  constructor() {
    makeAutoObservable(this);
    this.offscreenCtx = this.offscreenCanvas.getContext(
      "2d",
    ) as OffscreenCanvasRenderingContext2D;
    this.offscreenCtx.imageSmoothingEnabled = false;
  }

  resize(width: number, height: number) {
    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;

    tmpCtx.canvas.width = width;
    tmpCtx.canvas.height = height;
  }

  draw() {
    this.offscreenCtx.fillStyle = "white";
    this.offscreenCtx.fillRect(
      0,
      0,
      this.offscreenCtx.canvas.width,
      this.offscreenCtx.canvas.height,
    );

    tmpCtx.fillStyle = "white";
    tmpCtx.fillRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);

    this.onDraw();
  }
}
