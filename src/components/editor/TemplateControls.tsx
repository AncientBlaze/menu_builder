import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";

export function TemplateControls() {
  const { menu, setMenu } = useMenuEditor();
  const theme = menu.theme;

  const updateTheme = (
    patch: Partial<typeof theme>
  ) => {
    setMenu((m) => ({
      ...m,
      theme: {
        ...m.theme,
        ...patch,
      },
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide opacity-70">
        Template Settings
      </h3>

      {/* Layout */}
      <ControlGroup
        label="Layout"
        description="How sections flow across the page"
      >
        <OptionRow>
          <OptionButton
            active={theme.layout === "single-column"}
            onClick={() =>
              updateTheme({ layout: "single-column" })
            }
          >
            Single column
          </OptionButton>

          <OptionButton
            active={theme.layout === "two-column"}
            onClick={() =>
              updateTheme({ layout: "two-column" })
            }
          >
            Two column
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* Density */}
      <ControlGroup
        label="Density"
        description="Vertical spacing between items"
      >
        <OptionRow>
          <OptionButton
            active={theme.density === "compact"}
            onClick={() =>
              updateTheme({ density: "compact" })
            }
          >
            Compact
          </OptionButton>

          <OptionButton
            active={theme.density === "comfortable"}
            onClick={() =>
              updateTheme({
                density: "comfortable",
              })
            }
          >
            Comfortable
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* Divider */}
      <ControlGroup
        label="Section Divider"
        description="Visual separation between sections"
      >
        <OptionRow>
          <OptionButton
            active={theme.dividerStyle === "none"}
            onClick={() =>
              updateTheme({ dividerStyle: "none" })
            }
          >
            None
          </OptionButton>

          <OptionButton
            active={theme.dividerStyle === "line"}
            onClick={() =>
              updateTheme({ dividerStyle: "line" })
            }
          >
            Line
          </OptionButton>

          <OptionButton
            active={theme.dividerStyle === "accent"}
            onClick={() =>
              updateTheme({
                dividerStyle: "accent",
              })
            }
          >
            Accent
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* Price alignment */}
      <ControlGroup
        label="Price Alignment"
        description="How prices align with item names"
      >
        <OptionRow>
          <OptionButton
            active={theme.priceAlignment === "right"}
            onClick={() =>
              updateTheme({
                priceAlignment: "right",
              })
            }
          >
            Right aligned
          </OptionButton>

          <OptionButton
            active={theme.priceAlignment === "inline"}
            onClick={() =>
              updateTheme({
                priceAlignment: "inline",
              })
            }
          >
            Inline
          </OptionButton>
        </OptionRow>
      </ControlGroup>
    </div>
  );
}

/* =====================
   UI Primitives
===================== */

function ControlGroup({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <div className="text-xs font-medium">
          {label}
        </div>
        {description && (
          <div className="text-xs opacity-60">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function OptionRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {children}
    </div>
  );
}

function OptionButton({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1.5 rounded-md text-sm transition",
        active
          ? "bg-slate-900 text-white"
          : "bg-slate-100 hover:bg-slate-200"
      )}
    >
      {children}
    </button>
  );
}
