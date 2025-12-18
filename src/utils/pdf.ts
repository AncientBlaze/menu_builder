import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generateMenuPdfBlob(
  element: HTMLElement
): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2, // sharper text
    useCORS: true,
    backgroundColor: "#ffffff"
  });
  const flat = document.createElement("canvas");
  flat.width = canvas.width;
  flat.height = canvas.height;

  const ctx = flat.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, flat.width, flat.height);
  ctx.drawImage(canvas, 0, 0);

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pageCanvas = document.createElement("canvas");
  const pageCtx = pageCanvas.getContext("2d")!;

  const pageHeightPx = Math.round(
    (canvas.width * pageHeight) / pageWidth
  );


  let renderedHeight = 0;

  while (renderedHeight < canvas.height) {
    pageCanvas.width = canvas.width;
    pageCanvas.height = Math.min(
      pageHeightPx,
      canvas.height - renderedHeight
    );

    pageCtx.clearRect(0, 0, pageCanvas.width, pageCanvas.height);
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
      (pageCanvas.height * imgWidth) / pageCanvas.width
    );

    renderedHeight += pageHeightPx;
  }

  return pdf.output("blob");
}

export async function exportMenuPDF(
  element: HTMLElement,
  fileName = "menu.pdf"
): Promise<void> {

  element.classList.add("pdf-export");
  const blob = await generateMenuPdfBlob(element);
  element.classList.remove("pdf-export");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
