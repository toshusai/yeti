import { downloadUrl } from "./downloadUrl";

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  downloadUrl(url, name);
}
