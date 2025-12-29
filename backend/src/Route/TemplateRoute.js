import { Router } from "express";
import {
  createTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
} from "../Controller/TemplateController.js";

const router = Router();


router.post("/create", createTemplate);
router.get("/get", getTemplates);
router.get("/:id", getTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
