import { MenuDocument } from "./menu";
import { TemplateBlock } from "./template";

export interface MenuPreset {
  id: string;
  name: string;
  category: PresetCategory,
  document: MenuDocument;
}

export type PresetCategory =
  | "vintage"
  | "elegant"
  | "bold"
  | "modern"
  | "custom";

export interface TemplatePreset {
  id: string;
  name: string;
  category: PresetCategory,
  document: TemplateDocument;
}

export interface TemplateDocument {
  id: string;
  name: string;
  theme: any;
  visuals?: any;
  blocks: TemplateBlock[];
  createdAt: string;
}