import { MenuDocument } from "@/types/menu";

const KEY_PREFIX = "menu:";

export function saveMenu(menu: MenuDocument): string {
  const id = crypto.randomUUID();
  localStorage.setItem(
    `${KEY_PREFIX}${id}`,
    JSON.stringify(menu)
  );
  return id;
}

export function loadMenu(id: string): MenuDocument | null {
  const raw = localStorage.getItem(`${KEY_PREFIX}${id}`);
  return raw ? JSON.parse(raw) : null;
}
