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
