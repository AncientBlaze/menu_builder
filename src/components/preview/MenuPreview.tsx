import { useRef } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";
import { GOOGLE_FONTS } from "@/constants/fonts";
import clsx from "clsx";
import { DraggableLogo } from "./DraggableLogo";

/* =====================
   Anchor math
===================== */

function resolveAnchor(anchor: string, rect: { width: number; height: number }) {
  switch (anchor) {
    case "top-left": return { x: 0, y: 0 };
    case "top-center": return { x: rect.width / 2, y: 0 };
    case "top-right": return { x: rect.width, y: 0 };
    case "center": return { x: rect.width / 2, y: rect.height / 2 };
    case "bottom-left": return { x: 0, y: rect.height };
    case "bottom-center": return { x: rect.width / 2, y: rect.height };
    case "bottom-right": return { x: rect.width, y: rect.height };
    default: return { x: 0, y: 0 };
  }
}

/* =====================
   Canvas Node View
===================== */

function CanvasNodeView({
  node,
  selected,
  onSelect,
  onDrag,
  onResize,
}: {
  node: any;
  selected: boolean;
  onSelect: () => void;
  onDrag: (dx: number, dy: number) => void;
  onResize: (dw: number, dh: number) => void;
}) {
  if (node.visible === false) return null;

  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const resizeStart = useRef<{ x: number; y: number } | null>(null);
  const rotateStart = useRef<{
    angle: number;
    rotation: number;
  } | null>(null);

  /* ---------- Drag / Rotate ---------- */

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect();

    if (node.locked || !selected) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // 🔄 ALT = ROTATE
    if (e.altKey) {
      const startAngle =
        Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);

      rotateStart.current = {
        angle: startAngle,
        rotation: node.rotation ?? 0,
      };

      const move = (ev: PointerEvent) => {
        if (!rotateStart.current) return;

        const angle =
          Math.atan2(ev.clientY - cy, ev.clientX - cx) *
          (180 / Math.PI);

        let delta = angle - rotateStart.current.angle;

        // 🐢 fine rotation
        if (ev.shiftKey) delta *= 0.2;

        onResize(0, 0);
        node.rotation = rotateStart.current.rotation + delta;
      };

      const up = () => {
        rotateStart.current = null;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };

      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      return;
    }

    // ⬛ NORMAL DRAG
    dragStart.current = { x: e.clientX, y: e.clientY };

    const move = (ev: PointerEvent) => {
      if (!dragStart.current) return;
      onDrag(
        ev.clientX - dragStart.current.x,
        ev.clientY - dragStart.current.y
      );
    };

    const up = () => {
      dragStart.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  /* ---------- Resize ---------- */

  const startResize = (
    e: React.PointerEvent,
    dir: "nw" | "ne" | "sw" | "se"
  ) => {
    if (node.locked) return;
    e.stopPropagation();

    resizeStart.current = { x: e.clientX, y: e.clientY };

    const aspect = node.width / node.height;

    const move = (ev: PointerEvent) => {
      if (!resizeStart.current) return;

      let dx = ev.clientX - resizeStart.current.x;
      let dy = ev.clientY - resizeStart.current.y;

      let dw = dir.includes("e") ? dx : -dx;
      let dh = dir.includes("s") ? dy : -dy;

      // 🔒 SHIFT = lock ratio
      if (ev.shiftKey) {
        if (Math.abs(dw) > Math.abs(dh)) {
          dh = dw / aspect;
        } else {
          dw = dh * aspect;
        }
      }

      // 🎯 ALT = resize from center
      if (ev.altKey) {
        dw *= 2;
        dh *= 2;
      }

      onResize(dw, dh);
    };

    const up = () => {
      resizeStart.current = null;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  /* ---------- Style ---------- */

  const style: React.CSSProperties = {
    width: node.width,
    height: node.height,
    transform: `translate(-50%, -50%) rotate(${node.rotation ?? 0}deg)`,
    pointerEvents: "auto",
    cursor: selected && !node.locked ? "move" : "default",
  };

  return (
    <div
      className={clsx("absolute", selected && "ring-2 ring-blue-500")}
      style={style}
      onPointerDown={onPointerDown}
    >
      {/* SHAPE */}
      {node.type === "shape" && node.props.kind !== "svg" && (
        <div
          className="w-full h-full"
          style={{
            background: node.props.fill ?? "#000",
            opacity: node.props.opacity ?? 1,
            borderRadius:
              node.props.kind === "circle" ? "50%" : node.props.radius ?? 0,
          }}
        />
      )}

      {/* SVG */}
      {node.type === "shape" && node.props.kind === "svg" && (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d={node.props.svgPath}
            fill={node.props.fill ?? "#000"}
            opacity={node.props.opacity ?? 1}
          />
        </svg>
      )}

      {/* IMAGE */}
      {node.type === "image" && (
        <img
          src={node.props.src}
          draggable={false}
          className="w-full h-full object-contain"
        />
      )}

      {/* RESIZE HANDLES */}
      {selected && !node.locked && (
        <>
          {(["nw", "ne", "sw", "se"] as const).map((dir) => (
            <div
              key={dir}
              className="absolute w-3 h-3 bg-white border border-blue-500"
              style={{
                top: dir.includes("n") ? 0 : "auto",
                bottom: dir.includes("s") ? 0 : "auto",
                left: dir.includes("w") ? 0 : "auto",
                right: dir.includes("e") ? 0 : "auto",
              }}
              onPointerDown={(e) => startResize(e, dir)}
            />
          ))}
        </>
      )}
    </div>
  );
}


/* =====================
   Menu Preview
===================== */

export function MenuPreview() {
  const {
    menu,
    renderMode,
    selectedCanvasNodeId,
    selectCanvasNode,
    updateCanvasNode,
  } = useMenuEditor();

  const canvasRef = useRef<HTMLDivElement>(null);

  const {
    theme,
    fontFamily,
    layout,
    density,
    dividerStyle,
    priceAlignment,
    accentColor,
  } = menu.theme;

  /* ---------- Layout helpers ---------- */

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

  const fontCss =
    GOOGLE_FONTS.find((f) => f.value === fontFamily)?.css ?? "serif";

  const visuals = menu.visuals;
  const logo = visuals?.logo;
  const bg = visuals?.background;

  const bgUrl = bg?.previewUrl || bg?.url || null;
  const showBackground = bg?.type !== "none" && typeof bgUrl === "string";

  const themeClasses: Record<string, string> = {
    light: "bg-white text-black",
    dark: "bg-black text-white",
    elegant: "bg-[#faf7f2] text-[#2e2a26]",
    vintage: "bg-[#f4efe8] text-[#3b332c]",
    bold: "bg-black text-white",
  };

  return (
    <div
      ref={canvasRef}
      className={clsx(
        "relative mx-auto w-full overflow-hidden rounded-lg shadow",
        "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl",
        themeClasses[theme]
      )}
      style={{ fontFamily: fontCss }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) {
          selectCanvasNode(null);
        }
      }}
    >
      {/* BACKGROUND */}
      {showBackground && (
        <div className="absolute inset-0 z-0">
          <img src={bgUrl} className="w-full h-full object-cover" />
        </div>
      )}

      {/* CANVAS */}
      <div className="absolute inset-0 z-10">
        {canvasRef.current &&
          menu.canvas.nodes
            .slice()
            .sort((a, b) => a.z - b.z)
            .map((node) => {
              const rect = canvasRef.current!.getBoundingClientRect();
              const anchor = resolveAnchor(node.anchor, rect);

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: anchor.x + node.offset.x,
                    top: anchor.y + node.offset.y,
                    zIndex: node.z,
                  }}
                >
                  <CanvasNodeView
                    node={node}
                    selected={node.id === selectedCanvasNodeId}
                    onSelect={() => selectCanvasNode(node.id)}
                    onDrag={(dx, dy) =>
                      updateCanvasNode(node.id, {
                        offset: {
                          x: node.offset.x + dx,
                          y: node.offset.y + dy,
                        },
                      })
                    }
                    onResize={(dw, dh) =>
                      updateCanvasNode(node.id, {
                        width: Math.max(40, node.width + dw),
                        height: Math.max(40, node.height + dh),
                      })
                    }
                  />
                </div>
              );
            })}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 p-4 sm:p-6 md:p-8 lg:p-10 pointer-events-none">
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
                      priceAlignment === "inline"
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
                            item.isVeg ? "bg-green-600" : "bg-red-600"
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

      {renderMode === "editor" && <DraggableLogo />}
    </div>
  );
}
