import mongoose, { Schema } from "mongoose";

const TemplateSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    template: { type: Object, required: true },
    prime: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Template = mongoose.model("Template", TemplateSchema);
export default Template;