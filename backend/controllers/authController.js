import User from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
    const { photo, name, email, password, confirmPassword } = req.body;

    try {
        // checking user
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists." });
        }
        // checking password
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't matched." });
        }

        // hashing the password
        const salt = await bcrypt.genSalt(12);
        const hashedPassowrd = await bcrypt.hash(password, salt);


        const result = await User.create({ photo, name, email, password: hashedPassowrd })

        const token = jwt.sign({ id: result._id, name: result.name, email: result.email }, JWT_SECRET)

        res.status(200).json({ success: true, message: "SignUp Successfull", result, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "registration failed" });
    }
};

export const login = async (req, res) => {
    // destructing
    const { email } = req.body

    try {
        // checking user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User dosen't exists." });
        }

        // checking user password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const { password, role, ...rest } = user._doc;

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, JWT_SECRET)


        // setting cookie and sending to client
        const expirationTime = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 15 days
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: expirationTime,
        }).status(200).json({ success: true, message: "logged in successfully", token, data: { ...rest }, role })

        // res.status(200).json({ success: true, message: "Login Successfull", result: user, token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to Login" });
    }
};