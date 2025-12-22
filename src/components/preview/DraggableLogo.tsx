// components/preview/DraggableLogo.tsx

import { useRef } from "react";
import { useMenuEditor } from "@/context/MenuEditorContext";

export function DraggableLogo() {
  const { menu, updateMenu } = useMenuEditor();
  const logo = menu.visuals?.logo;
  const ref = useRef<HTMLImageElement>(null);

  if (!logo || logo.position !== "overlay" || !logo.url) return null;

  const offset = logo.offset ?? { x: 0, y: 0 };

  return (
    <img
      ref={ref}
      src={logo.url}
      alt="Logo"
      style={{
        position: "absolute",
        right: offset.x,
        bottom: offset.y,
        height: logo.size,
        cursor: "grab",
        userSelect: "none",
      }}
      onPointerDown={(e) => {
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startOffset = { ...offset };

        const onMove = (ev: PointerEvent) => {
          const dx = startX - ev.clientX;
          const dy = startY - ev.clientY;

          updateMenu({
            visuals: {
              ...menu.visuals,
              logo: {
                ...logo,
                offset: {
                  x: startOffset.x + dx,
                  y: startOffset.y + dy,
                },
              },
            },
          });
        };

        const onUp = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      }}
    />
  );
}
