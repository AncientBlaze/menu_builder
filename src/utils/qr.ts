import QRCode from "qrcode";

export async function generateQrDataUrl(
  path: string
): Promise<string> {

  return QRCode.toDataURL(path, {
    width: 256,
    margin: 1,
    errorCorrectionLevel: "L",
  });
}
