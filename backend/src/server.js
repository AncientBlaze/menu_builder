import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const menus = new Map();

app.post("/menu", (req, res) => {
  const id = crypto.randomUUID();
  menus.set(id, req.body);
  res.json({ id });
});

app.get("/menu/:id", (req, res) => {
  const menu = menus.get(req.params.id);
  if (!menu) return res.status(404).json({ error: "Not found" });
  res.json(menu);
});

app.listen(3001, () => {
  console.log("Menu server running on 3001");
});
