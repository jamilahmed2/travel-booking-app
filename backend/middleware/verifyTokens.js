import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        return res.status(401).json({ success: false, message: "you are no authorized" })
    }

    // if thier is tokenthen verify it
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "invalid token" })
        }

        req.user = user;
        next();
    })
}

// user verify
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === user.params.id || req.user.role === "admin") {
            next();
        }
        return res.status(401).json({ success: false, message: "you're not authenticated" })
    })
}

// admin verify
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized as admin" });
        }
    });
}

