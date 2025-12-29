import { TemplateBuilder } from "@/components/template/TemplateBuilder";

export default function TemplateEditor() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">
        Template Builder
      </h1>
      <TemplateBuilder />
    </div>
  );
}
