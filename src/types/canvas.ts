export type CanvasNodeType = "shape" | "text" | "image";

export type Anchor =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type CanvasNode = {
  id: string;
  type: CanvasNodeType;

  anchor: Anchor;
  offset: { x: number; y: number };

  width: number;
  height: number;
  rotation?: number;

  z: number;
  locked?: boolean;
  visible?: boolean;

  // 🔥 NEW (safe additions)
  name?: string;
  groupId: string | null;

  props: Record<string, any>;
};