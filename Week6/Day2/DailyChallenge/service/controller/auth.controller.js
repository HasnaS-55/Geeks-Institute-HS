import {User} from "../models/auth.model.js";
import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { email, username, firstname, lastname, password, confirmPassword } =
      req.body;
    if (
      !email ||
      !username ||
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
   
    
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    
    

    const newUser = await User.createUser(
      email,
      username,
      firstname,
      lastname,
      password
    );

    console.log(newUser);
    
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Your email is incorrect" });
    }
    

    const isPassWordValid = await comparePassword(password, user.password_hash);
    if (!isPassWordValid) {
      return res.status(401).json({ message: "Your password is incorrect" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message, reason: "Failed to login" });
  }
};
