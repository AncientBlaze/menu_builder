import express from "express";
import { createTemplate, deleteTemplate, getTemplate, getTemplates, UpdateTemplate } from "../Controller/TemplateController.js";

const router = express.Router();

router.post("/createTemplate", createTemplate);
router.get("/getTemplates/:id", getTemplates); // send user id in params
router.get("/getTemplate/:id", getTemplate); // send template id in params
router.put("/UpdateTemplate/:id", UpdateTemplate);
router.delete("/deleteTemplate/:id", deleteTemplate);

export default router;