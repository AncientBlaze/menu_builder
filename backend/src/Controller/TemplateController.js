import Template from "../Model/Template.js";
import User from "../Model/User.js";

export const createTemplate = async (req, res) => {
    const { user_id, template, prime } = req.body;
    if (!user_id || !prime) return res.status(400).json({ error: "All fields are required" });
    if (!template || typeof template !== "object") return res.status(400).json({ error: "Invalid template data" });
    try {
        const newTemplate = new Template({ user_id, template, prime });
        await newTemplate.save();
        return res.status(201).json({ message: "Template created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTemplates = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        console.log(user);
        if (!user) return res.status(404).json({ error: "User not found" });

        const template = await Template.find({ user_id: id }).populate("user_id", "-password");
        if (!template) return res.status(404).json({ error: "Template not found for this user" });
        return res.status(200).json(template);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const getTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const template = await Template.findOne({ _id: id }).populate("user_id", "-password");
        if (!template) return res.status(404).json({ error: "Template not found" });
        return res.status(200).json(template);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const UpdateTemplate = async (req, res) => {
    const { id } = req.params;
    const { template, prime } = req.body;
    if (!template || typeof template !== "object") return res.status(400).json({ error: "Invalid template data" });
    try {
        const template_exist = await Template.findOne({ _id: id });
        if (!template_exist) return res.status(404).json({ error: "Template not found" });
        
        await Template.updateOne({ _id: id }, { $set: { template, prime } });
        return res.status(200).json({ message: "Template updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const deleteTemplate = async (req, res) => {
    const { id } = req.params;
    try {
        const template = await Template.findOne({ _id: id });
        if (!template) return res.status(404).json({ error: "Template not found" });
        await Template.deleteOne({ _id: id });
        return res.status(200).json({ message: "Template deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}