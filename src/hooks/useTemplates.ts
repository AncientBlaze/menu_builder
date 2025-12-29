import { useEffect } from "react";
import { templateStore } from "@/stores/templateStore";
import { fetchTemplates } from "@/utils/api";

export function useTemplates() {
  useEffect(() => {
    fetchTemplates().then((templates) => {
      templateStore.setState((s) => ({
        ...s,
        templates,
      }));
    });
  }, []);
}
