import { MenuDocument } from "./menu";

export interface MenuPreset {
  id: string;
  name: string;
  category: "vintage" | "elegant" | "bold" | "modern";
  document: MenuDocument;
}
