import { MenuDocument } from "@/types/menu";
import clsx from "clsx";

type Props = {
  document: MenuDocument;
  active?: boolean;
};

export function PresetPreview({
  document,
  active = false,
}: Props) {
  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-neutral-900 text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  return (
    <div
      className={clsx(
        "border rounded-lg overflow-hidden transition",
        active
          ? "border border-b-blue-500"
          : "hover:ring-1 hover:ring-gray-400"
      )}
    >
      {/* Scale wrapper */}
      <div
        className="origin-top-left"
        style={{
          transform: "scale(0.25)",
          width: "400%",
        }}
      >
        <div
          className={clsx(
            "p-6 min-h-[300px]",
            themeClasses[document.theme.theme]
          )}
          style={{
            fontFamily:
              document.theme.fontFamily === "serif"
                ? "Georgia, serif"
                : document.theme.fontFamily === "sans"
                ? "Inter, sans-serif"
                : "monospace",
          }}
        >
          {/* Header */}
          <div className="text-center mb-4">
            <div className="font-bold">
              {document.meta.restaurantName}
            </div>
            {document.meta.tagline && (
              <div className="text-xs opacity-70">
                {document.meta.tagline}
              </div>
            )}
          </div>

          {/* Sections (lightweight render) */}
          <div className="space-y-3">
            {document.sections.slice(0, 2).map((s) => (
              <div key={s.id}>
                <div
                  className="text-sm font-semibold border-b mb-1"
                  style={{
                    borderColor:
                      document.theme.accentColor,
                  }}
                >
                  {s.title}
                </div>

                {s.items.slice(0, 2).map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between text-xs"
                  >
                    <span>{i.name}</span>
                    <span>{i.price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
