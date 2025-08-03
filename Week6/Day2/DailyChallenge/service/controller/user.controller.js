import { User } from '../models/user.model.js'




export const getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message, reason: "could not fetch all" });
    }
}


export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.getUser(id)

        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message, reason: "could not fetch this user" });
    }
}


export const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const {first_name, last_name} = req.body
        const user = await User.updateUser(id, first_name, last_name)
        res.status(201).json({"message": "User created successfully", "user": user})
    } catch (error) {
        res.status(500).json({ message: error.message, reason: "Failed to update" })
    }
}