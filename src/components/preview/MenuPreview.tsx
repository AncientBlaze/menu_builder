import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";

export function MenuPreview() {
  const { menu } = useMenuEditor();

  const isTwoColumn = menu.theme.layout === "two-column";

  const themeClasses = {
    light: "bg-white text-black",
    dark: "bg-neutral-900 text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  return (
    <div
      id="menu-preview"
      className={clsx(
        "mx-auto max-w-200 rounded-lg p-10 shadow",
        themeClasses[menu.theme.theme]
      )}
      style={{
        pageBreakInside: "avoid",
        fontFamily:
          menu.theme.fontFamily === "serif"
            ? "Georgia, serif"
            : menu.theme.fontFamily === "sans"
            ? "Inter, sans-serif"
            : "monospace",
      }}
    >
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          {menu.meta.restaurantName}
        </h1>
        {menu.meta.tagline && (
          <p className="text-sm opacity-80 mt-1">
            {menu.meta.tagline}
          </p>
        )}
        {menu.meta.address && (
          <p className="text-xs opacity-70 mt-2">
            {menu.meta.address}
          </p>
        )}
      </header>

      {/* Sections container */}
      <div
        className={clsx(
          "gap-10",
          isTwoColumn ? "columns-2" : "columns-1"
        )}
        style={{
          columnGap: "2.5rem",
        }}
      >
        {menu.sections.map((section) => (
          <section
            key={section.id}
            className="mb-8 break-inside-avoid"
          >
            <h2
              className="text-xl font-semibold border-b pb-1 mb-4"
              style={{
                borderColor: menu.theme.accentColor,
              }}
            >
              {section.title}
            </h2>

            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-6"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
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
                      <p className="text-sm opacity-75">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="font-semibold">
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
