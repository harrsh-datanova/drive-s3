import { compare, hash } from "bcrypt";

const encryptPassword = async (password: string) => {
    const encryptedPassword = await hash(password, 10);
    return encryptedPassword;
};

const comparePassword = async (password: string, encryptedPassword: string) => {
    const isValid = await compare(password, encryptedPassword);
    return isValid;
};

export { encryptPassword, comparePassword };
