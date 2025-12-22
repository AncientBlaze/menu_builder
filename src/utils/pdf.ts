import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/* --------------------------------
   Internal helper
-------------------------------- */

const nextPaint = () =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => resolve())
  );

/* --------------------------------
   Generate PDF Blob
-------------------------------- */

export async function generateMenuPdfBlob(
  element: HTMLElement
): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,
  });

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pageHeightPx = Math.round(
    (canvas.width * pageHeight) / pageWidth
  );

  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d")!;

  let renderedHeight = 0;

  while (renderedHeight < canvas.height) {
    pageCanvas.width = canvas.width;
    pageCanvas.height = Math.min(
      pageHeightPx,
      canvas.height - renderedHeight
    );

    pageCtx.clearRect(
      0,
      0,
      pageCanvas.width,
      pageCanvas.height
    );

    pageCtx.drawImage(
      canvas,
      0,
      renderedHeight,
      canvas.width,
      pageCanvas.height,
      0,
      0,
      canvas.width,
      pageCanvas.height
    );

    const imgData = pageCanvas.toDataURL("image/png");

    if (renderedHeight > 0) pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      imgWidth,
      (pageCanvas.height * imgWidth) /
        pageCanvas.width
    );

    renderedHeight += pageHeightPx;
  }

  return pdf.output("blob");
}

/* --------------------------------
   Export with Editor State
-------------------------------- */

export async function exportMenuPDF(
  element: HTMLElement,
  options?: {
    fileName?: string;
    setExportMode?: (v: boolean) => void;
  }
): Promise<void> {
  const fileName = options?.fileName ?? "menu.pdf";

  // 🔒 Enter export mode
  options?.setExportMode?.(true);
  element.classList.add("pdf-export");

  // 🧘 Let layout + fonts + bg settle
  await nextPaint();
  await nextPaint();

  const blob = await generateMenuPdfBlob(element);

  // 🔓 Exit export mode
  element.classList.remove("pdf-export");
  options?.setExportMode?.(false);

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
