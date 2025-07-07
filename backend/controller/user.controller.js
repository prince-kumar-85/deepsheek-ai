import { User } from '../model/user.model.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }

    // Create and save new user
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
    });

    await newUser.save();

    res.status(201).json({
      message: "User signed up successfully",
      user: newUser,
    });

  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup server error" });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Invalid email or password" });
        }

        // Compare password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Invalid email or password" });
        }

        // If user exists and password is correct, return user data
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Login server error" });
    }
}


export const logout=(req,res)=>{
    return res.status(200).json({message:"Logout successful"});
}