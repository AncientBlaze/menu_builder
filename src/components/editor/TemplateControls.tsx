import { useMenuEditor } from "@/context/MenuEditorContext";
import clsx from "clsx";
import { LogoControls } from "./LogoControls";
import { BackgroundControls } from "./BackgroundControls";

/* =====================
   Template Controls
===================== */

export function TemplateControls() {
  const { menu, updateMenu } = useMenuEditor();
  const theme = menu.theme;

  const updateTheme = (patch: Partial<typeof theme>) =>
    updateMenu({
      theme: {
        ...menu.theme,
        ...patch,
      },
    });

  return (
    <div className="rounded-2xl p-5 space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
        Template Settings
      </h3>

      {/* ───────────────── Layout ───────────────── */}
      <ControlGroup label="Layout" description="How sections flow across the page">
        <OptionRow>
          <OptionButton
            active={theme.layout === "single-column"}
            onClick={() => updateTheme({ layout: "single-column" })}
          >
            Single column
          </OptionButton>

          <OptionButton
            active={theme.layout === "two-column"}
            onClick={() => updateTheme({ layout: "two-column" })}
          >
            Two column
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* ───────────────── Density ───────────────── */}
      <ControlGroup label="Density" description="Vertical spacing between items">
        <OptionRow>
          <OptionButton
            active={theme.density === "compact"}
            onClick={() => updateTheme({ density: "compact" })}
          >
            Compact
          </OptionButton>

          <OptionButton
            active={theme.density === "comfortable"}
            onClick={() => updateTheme({ density: "comfortable" })}
          >
            Comfortable
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* ───────────────── Divider ───────────────── */}
      <ControlGroup label="Section Divider" description="Visual separation between sections">
        <OptionRow>
          <OptionButton
            active={theme.dividerStyle === "none"}
            onClick={() => updateTheme({ dividerStyle: "none" })}
          >
            None
          </OptionButton>

          <OptionButton
            active={theme.dividerStyle === "line"}
            onClick={() => updateTheme({ dividerStyle: "line" })}
          >
            Line
          </OptionButton>

          <OptionButton
            active={theme.dividerStyle === "accent"}
            onClick={() => updateTheme({ dividerStyle: "accent" })}
          >
            Accent
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* ───────────────── Price ───────────────── */}
      <ControlGroup label="Price Alignment">
        <OptionRow>
          <OptionButton
            active={theme.priceAlignment === "right"}
            onClick={() => updateTheme({ priceAlignment: "right" })}
          >
            Right
          </OptionButton>

          <OptionButton
            active={theme.priceAlignment === "inline"}
            onClick={() => updateTheme({ priceAlignment: "inline" })}
          >
            Inline
          </OptionButton>
        </OptionRow>
      </ControlGroup>

      {/* ───────────────── Logo ───────────────── */}
      <LogoControls />

      {/* ───────────────── Background ───────────────── */}
      <ControlGroup label="Background">
        <BackgroundControls />
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
    <div className="space-y-3">
      <div>
        <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
          {label}
        </div>
        {description && (
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

function OptionRow({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 flex-wrap">{children}</div>;
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
        "px-3 py-1.5 rounded-md text-sm border transition",
        active
          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-slate-100"
          : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"
      )}
    >
      {children}
    </button>
  );
}
