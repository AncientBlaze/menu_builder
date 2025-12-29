export type TemplateBlock =
  | {
    id: string;
    type: "header";
    text: string;
  }
  | {
    id: string;
    type: "sections";
    showTitle: boolean;
  }
  | {
    id: string;
    type: "divider";
  }
  | {
    id: string;
    type: "spacer";
    height: number;
  };


export interface TemplateDocument {
  id: string;
  name: string;
  theme: any;
  visuals?: any;
  blocks: TemplateBlock[];
  createdAt: string;
}
