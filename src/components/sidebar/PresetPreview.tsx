import { MenuDocument } from "@/types/menu";
import clsx from "clsx";
import { GOOGLE_FONTS } from "@/constants/fonts";

type Props = {
  document: MenuDocument;
  active?: boolean;
};

export function PresetPreview({
  document,
  active = false,
}: Props) {
  const { theme, meta, visuals, sections } = document;

  /* --------------------
     Theme base colors
  -------------------- */

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-neutral-900 text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  /* --------------------
     Font mapping
  -------------------- */

  const fontCss =
    GOOGLE_FONTS.find((f) => f.value === theme.fontFamily)?.css ??
    "serif";

  /* --------------------
     Background
  -------------------- */

  const bg = visuals?.background;
  const bgImage = bg?.url;

  /* --------------------
     Logo
  -------------------- */

  const logo = visuals?.logo;

  return (
    <div
      className={clsx(
        "rounded-lg overflow-hidden transition",
        active
          ? "ring-2 ring-blue-500 shadow-md"
          : "hover:ring-1 hover:ring-slate-400"
      )}
    >
      {/* SCALE WRAPPER */}
      <div
        className="origin-top-left"
        style={{
          transform: "scale(0.25)",
          width: "400%",
        }}
      >
        {/* PREVIEW CANVAS */}
        <div
          className={clsx(
            "relative p-6 min-h-[300px]",
            themeClasses[theme.theme]
          )}
          style={{
            fontFamily: fontCss,
            backgroundImage: bgImage
              ? `url(${bgImage})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background overlay */}
          {bgImage && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor:
                  bg?.overlay?.color ?? "#000000",
                opacity: bg?.overlay?.opacity ?? 0.25,
              }}
            />
          )}

          {/* CONTENT */}
          <div className="relative z-10">
            {/* LOGO (TOP) */}
            {logo?.url && logo.position === "top" && (
              <div className="flex justify-center mb-4">
                <img
                  src={logo.url}
                  alt="Logo"
                  style={{
                    height: logo.size ?? 48,
                  }}
                />
              </div>
            )}

            {/* HEADER */}
            <div className="text-center mb-4">
              <div className="font-bold">
                {meta.restaurantName}
              </div>
              {meta.tagline && (
                <div className="text-xs opacity-70">
                  {meta.tagline}
                </div>
              )}
            </div>

            {/* SECTIONS (lightweight) */}
            <div className="space-y-3">
              {sections.slice(0, 2).map((s) => (
                <div key={s.id}>
                  <div
                    className="text-sm font-semibold border-b mb-1"
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
                      className="flex justify-between text-xs opacity-90"
                    >
                      <span className="truncate">
                        {i.name}
                      </span>
                      <span>
                        {meta.currency}
                        {i.price}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* LOGO (BOTTOM) */}
            {logo?.url && logo.position === "bottom" && (
              <div className="flex justify-center mt-6">
                <img
                  src={logo.url}
                  alt="Logo"
                  style={{
                    height: logo.size ?? 48,
                  }}
                />
              </div>
            )}
          </div>

          {/* LOGO OVERLAY */}
          {logo?.url && logo.position === "overlay" && (
            <img
              src={logo.url}
              alt="Logo"
              className="absolute bottom-4 right-4 opacity-80"
              style={{
                height: (logo.size ?? 48) * 0.9,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
