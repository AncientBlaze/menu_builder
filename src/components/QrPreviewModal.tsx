import { useEffect, useState } from "react";
import { generateQrDataUrl } from "@/utils/qr";

type Props = {
  value: string;
  onClose: () => void;
};

export function QrPreviewModal({ value, onClose }: Props) {
  const [qr, setQr] = useState<string | null>(null);

  useEffect(() => {
    generateQrDataUrl(value).then(setQr);
  }, [value]);

  if (!qr) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-5 w-[320px] text-center">
        <h3 className="font-semibold mb-3">Menu QR Code</h3>

        <img
          src={qr}
          alt="Menu QR"
          className="mx-auto mb-4"
        />

        <div className="flex gap-2 justify-center">
          <a
            href={qr}
            download="menu-qr.png"
            className="px-3 py-1 bg-black text-white rounded text-sm"
          >
            Download
          </a>

          <button
            onClick={onClose}
            className="px-3 py-1 border rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
