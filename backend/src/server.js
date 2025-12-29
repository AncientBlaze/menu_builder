import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./Config/ConnectDb.ts";
import uploadRouter from "./Route/upload.js";
import UserRoute from "./Route/UserRoute.js";
import TemplateRoute from "./Route/TemplateRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, _, res, next) => {
  if (err?.name === "MulterError") {
    return res.status(400).json({
      error: err.message,
    });
  }
  next(err);
});

const menus = new Map();

const port = process.env.PORT || 3001

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


app.use("/upload", uploadRouter);
app.use("/auth/user", UserRoute);
app.use("/templates", TemplateRoute);

await connectDB();
app.listen(port, () => {
  console.log("Menu server running on 3001");
});
