import axios from "axios";
import { MenuDocument } from "@/types/menu";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Save menu to backend
 */
export async function publishMenu(menu: MenuDocument) {
  const res = await api.post("/menu", menu);
  return res.data as { id: string };
}

/**
 * Load menu from backend
 */
export async function fetchMenu(id: string): Promise<MenuDocument> {
  const res = await api.get(`/menu/${id}`);
  return res.data;
}
