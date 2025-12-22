import { useMenuEditor } from "@/context/MenuEditorContext";
import { GOOGLE_FONTS } from "@/constants/fonts";
import clsx from "clsx";

export function MenuPreview() {
  const { menu } = useMenuEditor();

  const {
    layout,
    density,
    dividerStyle,
    priceAlignment,
    accentColor,
    theme,
    fontFamily,
  } = menu.theme;

  const isTwoColumn = layout === "two-column";

  /* =====================
     Theme backgrounds
  ===================== */

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  /* =====================
     Density mappings
  ===================== */

  const sectionSpacing =
    density === "compact"
      ? "mb-4 sm:mb-6"
      : "mb-6 sm:mb-8";

  const itemSpacing =
    density === "compact"
      ? "space-y-2 sm:space-y-3"
      : "space-y-3 sm:space-y-4";

  /* =====================
     Divider styles
  ===================== */

  const dividerClass =
    dividerStyle === "none"
      ? ""
      : dividerStyle === "line"
      ? "border-b border-slate-300"
      : "border-b-2";

  /* =====================
     Price alignment
  ===================== */

  const isInlinePrice =
    priceAlignment === "inline";

  /* =====================
     Font mapping (FIX)
  ===================== */

  const fontCss =
    GOOGLE_FONTS.find(
      (f) => f.value === fontFamily
    )?.css ?? "serif";

  return (
    <div
      id="menu-preview"
      className={clsx(
        "mx-auto w-full",
        "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl",
        "rounded-lg shadow",
        "p-4 sm:p-6 md:p-8 lg:p-10",
        themeClasses[theme]
      )}
      style={{
        pageBreakInside: "avoid",
        fontFamily: fontCss,
      }}
    >
      {/* Header */}
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

      {/* Sections */}
      <div
        className={clsx(
          isTwoColumn
            ? "grid grid-cols-1 md:grid-cols-2 items-start gap-8"
            : "flex flex-col"
        )}
      >
        {menu.sections.map((section) => (
          <section
            key={section.id}
            className={sectionSpacing}
          >
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
                    "gap-2 sm:gap-6",
                    isInlinePrice
                      ? "flex flex-wrap items-center"
                      : "flex flex-col sm:flex-row sm:justify-between"
                  )}
                >
                  {/* Item info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm sm:text-base">
                        {item.name}
                      </span>

                      {item.isVeg ? (
                        <span
                          className="inline-block w-2 h-2 bg-green-600 rounded-full"
                          aria-label="Vegetarian"
                        />
                      ) : (
                        <span
                          className="inline-block w-2 h-2 bg-red-600 rounded-full"
                          aria-label="Non-vegetarian"
                        />
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-sm opacity-75 leading-snug">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div
                    className={clsx(
                      "text-sm sm:text-base font-semibold whitespace-nowrap",
                      isInlinePrice
                        ? "ml-2"
                        : "text-right sm:text-left"
                    )}
                  >
                    {menu.meta.currency} {item.price}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
