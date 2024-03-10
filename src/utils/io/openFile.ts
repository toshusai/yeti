export function openFile(accept: string, onOpen: (files: FileList) => void) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = accept;
  input.onchange = async () => {
    const files = input.files;
    if (!files) return;
    onOpen(files);
  };
  input.click();
  input.remove();
}
