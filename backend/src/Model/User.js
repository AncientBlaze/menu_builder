import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    prime: { type: Boolean, default: false},
    restaurant_name: { type: String, required: true },
    // otp: { type: String, default: "" },
    // auth: { type: Boolean, default: false },
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
export default User;