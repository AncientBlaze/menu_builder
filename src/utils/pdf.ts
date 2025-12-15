import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportMenuPDF(
  element: HTMLElement,
  fileName = "menu.pdf"
): Promise<void> {
  // Higher scale = sharper PDF
  const scale = 2;

  const canvas = await html2canvas(element, {
    scale,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 size in mm
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Canvas dimensions in px
  const imgWidthPx = canvas.width;
  const imgHeightPx = canvas.height;

  // Convert px → mm
  const imgWidthMm = pageWidth;
  const imgHeightMm =
    (imgHeightPx * imgWidthMm) / imgWidthPx;

  let remainingHeight = imgHeightMm;
  let position = 0;

  // First page
  pdf.addImage(
    imgData,
    "PNG",
    0,
    position,
    imgWidthMm,
    imgHeightMm
  );

  remainingHeight -= pageHeight;

  // Additional pages
  while (remainingHeight > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidthMm,
      imgHeightMm
    );
    remainingHeight -= pageHeight;
  }

  pdf.save(fileName);
}
