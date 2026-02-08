import html2canvas from "html2canvas";

export async function captureSnapshot(el: HTMLElement) {
  const canvas = await html2canvas(el, {
    scale: 2,
    backgroundColor: null,
    useCORS: true,
    logging: false,
  });

  return canvas.toDataURL("image/jpeg", 1);
}
