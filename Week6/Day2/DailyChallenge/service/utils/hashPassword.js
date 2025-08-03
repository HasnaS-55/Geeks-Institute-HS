import bycrypt from "bcryptjs"

export const hashPassword = (password) => {
    return bycrypt.hash(password, 12)
}

export const comparePassword = async (password, hashPassword) => {
    return await bycrypt.compare(password, hashPassword)
}