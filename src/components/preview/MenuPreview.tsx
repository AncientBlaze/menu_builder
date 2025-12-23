import { useMenuEditor } from "@/context/MenuEditorContext";
import { GOOGLE_FONTS } from "@/constants/fonts";
import clsx from "clsx";
import { DraggableLogo } from "./DraggableLogo";

export function MenuPreview() {
  const { menu, renderMode } = useMenuEditor();

  const {
    theme,
    fontFamily,
    layout,
    density,
    dividerStyle,
    priceAlignment,
    accentColor,
  } = menu.theme;

  const visuals = menu.visuals;
  const logo = visuals?.logo;
  const bg = visuals?.background;

  /* -----------------------
     Font
  ----------------------- */

  const fontCss =
    GOOGLE_FONTS.find((f) => f.value === fontFamily)?.css ?? "serif";

  /* -----------------------
     Background (SAFE)
  ----------------------- */

  // ✅ previewUrl for editor, url for QR/mobile
  const bgUrl =
    bg?.previewUrl ||
    bg?.url ||
    null;

  const showBackground =
    bg?.type !== "none" && typeof bgUrl === "string";

  /* -----------------------
     Layout helpers
  ----------------------- */

  const isTwoColumn = layout === "two-column";

  const sectionSpacing =
    density === "compact" ? "mb-4 sm:mb-6" : "mb-6 sm:mb-8";

  const itemSpacing =
    density === "compact"
      ? "space-y-2 sm:space-y-3"
      : "space-y-3 sm:space-y-4";

  const dividerClass =
    dividerStyle === "none"
      ? ""
      : dividerStyle === "line"
      ? "border-b border-slate-300"
      : "border-b-2";

  const inlinePrice = priceAlignment === "inline";

  /* -----------------------
     Theme base
  ----------------------- */

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  return (
    <div
      id="menu-preview"
      className={clsx(
        "relative mx-auto w-full overflow-hidden rounded-lg shadow",
        "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl",
        themeClasses[theme]
      )}
      style={{ fontFamily: fontCss }}
    >
      {/* ───────────────── BACKGROUND MEDIA ───────────────── */}
      {showBackground && (
        <div className="absolute inset-0 z-0">
          <img
            src={bgUrl}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Overlay */}
          {bg?.overlay && (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: bg.overlay.color,
                opacity: bg.overlay.opacity,
              }}
            />
          )}
        </div>
      )}

      {/* ───────────────── CONTENT ───────────────── */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
        {/* LOGO TOP */}
        {logo?.url && logo.position === "top" && (
          <div
            className={clsx(
              "mb-4 flex",
              logo.align === "left" && "justify-start",
              logo.align === "center" && "justify-center",
              logo.align === "right" && "justify-end"
            )}
          >
            <img
              src={logo.url}
              alt="Logo"
              style={{ height: logo.size }}
              className="object-contain"
            />
          </div>
        )}

        {/* HEADER */}
        <header className="text-center mb-6 sm:mb-8 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {menu.meta.restaurantName}
          </h1>

          {menu.meta.tagline && (
            <p className="text-xs sm:text-sm opacity-80 mt-1">
              {menu.meta.tagline}
            </p>
          )}

          {menu.meta.address && (
            <p className="text-[11px] sm:text-xs opacity-70 mt-2">
              {menu.meta.address}
            </p>
          )}
        </header>

        {/* SECTIONS */}
        <div
          className={clsx(
            isTwoColumn
              ? "grid grid-cols-1 md:grid-cols-2 gap-8"
              : "flex flex-col"
          )}
        >
          {menu.sections.map((section) => (
            <section key={section.id} className={sectionSpacing}>
              <h2
                className={clsx(
                  "text-lg sm:text-xl font-semibold pb-1 mb-3 sm:mb-4",
                  dividerClass
                )}
                style={{
                  borderColor:
                    dividerStyle === "accent"
                      ? accentColor
                      : undefined,
                }}
              >
                {section.title}
              </h2>

              <div className={itemSpacing}>
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className={clsx(
                      inlinePrice
                        ? "flex flex-wrap items-center gap-2"
                        : "flex flex-col sm:flex-row sm:justify-between gap-2"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm sm:text-base">
                          {item.name}
                        </span>
                        <span
                          className={clsx(
                            "w-2 h-2 rounded-full",
                            item.isVeg
                              ? "bg-green-600"
                              : "bg-red-600"
                          )}
                        />
                      </div>

                      {item.description && (
                        <p className="text-xs sm:text-sm opacity-75">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="text-sm sm:text-base font-semibold whitespace-nowrap">
                      {menu.meta.currency} {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* LOGO BOTTOM */}
        {logo?.url && logo.position === "bottom" && (
          <div
            className={clsx(
              "mt-8 flex",
              logo.align === "left" && "justify-start",
              logo.align === "center" && "justify-center",
              logo.align === "right" && "justify-end"
            )}
          >
            <img
              src={logo.url}
              alt="Logo"
              style={{ height: logo.size }}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* LOGO OVERLAY (EDITOR ONLY) */}
      {renderMode === "editor" && <DraggableLogo />}
    </div>
  );
}
