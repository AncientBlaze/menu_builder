import axios from "axios";
import { MenuDocument } from "@/types/menu";
import { TemplateDocument } from "@/types/template";

const api = axios.create({
  baseURL: "/api",
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

/**
 * Sign up a new user
 */
export async function signup(data: {
  name: string;
  email: string;
  password: string;
  restaurant_name: string;
}) {
  const res = await api.post("/auth/user/signup", data);
  return res.data;
}

/**
 * Login user
 */
export async function login(data: {
  email: string;
  password: string;
}) {
  const res = await api.post("/auth/user/login", data);
  return res.data;
}


/* ======================
   TEMPLATES
====================== */

/**
 * Save a template
 */
export async function saveTemplate(
  template: TemplateDocument
) {
  const res = await api.post("/templates/create", template);
  return res.data;
}

/**
 * Fetch all templates (user + system)
 */
export async function fetchTemplates(): Promise<TemplateDocument[]> {
  const res = await api.get("/templates/get");
  return res.data;
}

/**
 * Delete template
 */
export async function deleteTemplate(id: string) {
  const res = await api.delete(`/templates/${id}`);
  return res.data;
}
