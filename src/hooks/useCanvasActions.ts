import { useMenuEditor } from "@/context/MenuEditorContext";

export function useCanvasActions() {
  const { addCanvasNode } = useMenuEditor();

  const addRectangle = () =>
    addCanvasNode({
      type: "shape",
      width: 300,
      height: 180,
      z: 0,
      props: {
        kind: "rect",
        fill: "#000",
        opacity: 0.06,
        radius: 16,
      },
    });

  const addCircle = () =>
    addCanvasNode({
      type: "shape",
      width: 200,
      height: 200,
      z: 0,
      props: {
        kind: "circle",
        fill: "#000",
        opacity: 0.06,
      },
    });

  const addSvgPath = (path: string) =>
    addCanvasNode({
      type: "shape",
      width: 300,
      height: 300,
      z: 0,
      props: {
        kind: "svg",
        svgPath: path,
        fill: "#000",
        opacity: 0.08,
      },
    });

  const addImage = (src: string) =>
    addCanvasNode({
      type: "image",
      width: 240,
      height: 240,
      z: 5,
      props: {
        src,
        fit: "contain",
      },
    });

  return {
    addRectangle,
    addCircle,
    addSvgPath,
    addImage,
  };
}
