import bcrypt from "bcrypt";

export const generatePassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);
    return hash;
};

export const comparePassword = async (Password, hash) => {
    return await bcrypt.compare(Password, hash);
};