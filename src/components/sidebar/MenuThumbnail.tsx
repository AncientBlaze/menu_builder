import clsx from "clsx";
import { MenuDocument } from "@/types/menu";
import { GOOGLE_FONTS } from "@/constants/fonts";

type Props = {
  document: MenuDocument;
};

export function MenuThumbnail({ document }: Props) {
  const { meta, theme, sections } = document;

  const fontCss =
    GOOGLE_FONTS.find((f) => f.value === theme.fontFamily)?.css ?? "serif";

  const themeClasses: Record<string, string> = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  return (
    <div
      className={clsx(
        "rounded-md overflow-hidden",
        themeClasses[theme.theme]
      )}
      style={{ fontFamily: fontCss }}
    >
      <div className="p-3 text-[11px] leading-tight space-y-2">
        {/* Header */}
        <div className="text-center">
          <div className="font-bold truncate">
            {meta.restaurantName}
          </div>
          {meta.tagline && (
            <div className="opacity-70 truncate">
              {meta.tagline}
            </div>
          )}
        </div>

        {/* Sections (limited) */}
        {sections.slice(0, 2).map((s) => (
          <div key={s.id}>
            <div
              className="font-semibold border-b mb-1"
              style={{
                borderColor:
                  theme.dividerStyle === "accent"
                    ? theme.accentColor
                    : "currentColor",
              }}
            >
              {s.title}
            </div>

            {s.items.slice(0, 2).map((i) => (
              <div
                key={i.id}
                className="flex justify-between opacity-90"
              >
                <span className="truncate">{i.name}</span>
                <span>
                  {meta.currency}
                  {i.price}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
