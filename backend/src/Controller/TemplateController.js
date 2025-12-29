import Template from "../Model/Template.js";

/* =========================
   CREATE TEMPLATE
========================= */
export const createTemplate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, document, isPrime = false } = req.body;

    if (!name || !document || typeof document !== "object") {
      return res.status(400).json({ error: "Invalid template data" });
    }

    const template = await Template.create({
      user_id: userId,
      name,
      document,
      category: "custom",
      isPrime,
    });
    res.status(201).json(template);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET MY TEMPLATES
========================= */
export const getTemplates = async (req, res) => {
  try {
    const userId = req.user.id;

    const templates = await Template.find({
      $or: [
        { category: "system" },
        { user_id: userId },
      ],
    }).sort({ createdAt: -1 });

    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET SINGLE TEMPLATE
========================= */
export const getTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    // Ownership check
    if (
      template.category !== "system" &&
      template.user_id.toString() !== req.user.id
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(template);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   UPDATE TEMPLATE
========================= */
export const updateTemplate = async (req, res) => {
  try {
    const { document, name, isPrime } = req.body;

    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    if (template.user_id.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    template.document = document ?? template.document;
    template.name = name ?? template.name;
    template.isPrime = isPrime ?? template.isPrime;

    await template.save();

    res.json({ message: "Template updated", template });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   DELETE TEMPLATE
========================= */
export const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    if (template.user_id.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await template.deleteOne();
    res.json({ message: "Template deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
