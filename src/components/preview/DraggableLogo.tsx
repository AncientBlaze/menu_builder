// components/preview/DraggableLogo.tsx

import { useRef } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";

export function DraggableLogo() {
  const { menu, updateMenu } = useMenuEditor();
  const logo = menu.visuals?.logo;
  const ref = useRef<HTMLImageElement>(null);

  if (!logo || logo.position !== "overlay" || !logo.url) return null;

  const offset = logo.offset ?? { x: 0, y: 0 };
  const GRID_SIZE = 20; // Snap to 10px grid

  const snapToGrid = (value: number) => {
    return Math.round(value / GRID_SIZE) * GRID_SIZE;
  };

  // Shadow styles
  const shadowStyles = {
    none: "none",
    soft: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 12px rgba(0, 0, 0, 0.15)",
    hard: "0 8px 24px rgba(0, 0, 0, 0.25)",
  };

  const shadowValue = shadowStyles[logo.shadow ?? "none"];

  return (
    <img
      ref={ref}
      src={logo.url}
      alt="Logo"
      draggable={false}
      style={{
        position: "absolute",
        right: offset.x,
        bottom: offset.y,
        height: logo.size,
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        pointerEvents: "auto",
        borderRadius: `${logo.borderRadius ?? 0}%`,
        opacity: (logo.opacity ?? 100) / 100,
        boxShadow: shadowValue,
      }}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        e.preventDefault();
        const target = e.currentTarget;
        target.setPointerCapture(e.pointerId);

        const startX = e.clientX;
        const startY = e.clientY;
        const startOffset = { ...offset };
        (target as HTMLElement).style.cursor = "grabbing";

        const onMove = (ev: PointerEvent) => {
          const dx = startX - ev.clientX;
          const dy = startY - ev.clientY;

          const newX = snapToGrid(startOffset.x + dx);
          const newY = snapToGrid(startOffset.y + dy);

          updateMenu({
            visuals: {
              ...menu.visuals,
              logo: {
                ...logo,
                offset: {
                  x: newX,
                  y: newY,
                },
              },
            },
          });
        };

        const onUp = () => {
          try {
            target.releasePointerCapture(e.pointerId);
          } catch (err) {}
          (target as HTMLElement).style.cursor = "grab";
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
        };

        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup", onUp);
      }}
    />
  );
}
