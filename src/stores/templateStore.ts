import { Store } from "@tanstack/react-store";
import { TemplateDocument } from "@/types/template";

type TemplateState = {
  templates: TemplateDocument[];
  activeTemplateId: string | null;
};

export const templateStore = new Store<TemplateState>({
  templates: [],
  activeTemplateId: null,
});
