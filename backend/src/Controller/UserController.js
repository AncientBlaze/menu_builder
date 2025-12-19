import User from "../Model/User.js";
import { comparePassword, generatePassword } from "../Utils/bcriptFile.js";

export const Signup = async (req, res) => {
    const { name, email, password, resturent_name } = req.body;
    if (!name || !email || !password || !resturent_name) {
        return res.status(400).json({ error: "All fields are required" });
    };

    try {
        const is_exist = await User.findOne({ email });
        if (is_exist) return res.status(400).json({ error: "User already exist" });

        const hashPassword = await generatePassword(password);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            resturent_name
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    };
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
        const UserDetails = {
            _id: user._id,
            name: user.name,
            email: user.email,
            resturent_name: user.resturent_name
        };
        return res.status(200).json({ message: "Login successful", user: UserDetails });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const PrimeMember = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "All fields are required" });
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });
        user.prime = true;
        await user.save();
        return res.status(200).json({ message: "User is now a prime member" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}