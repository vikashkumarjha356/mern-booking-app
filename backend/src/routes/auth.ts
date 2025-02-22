import express, { Request, Response } from "express"
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import User from "../models/users";
import bcrypt from "bcryptjs";
import "dotenv/config";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post('/login', [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters is required").isLength({ min: 6 }),

], async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: errors.array()
        })
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        if (user.password) {
            const isMatch = await bcrypt.compare(password, user.password);


            console.log(isMatch);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" })
            }
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" })

        res.cookie("auth_token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
            })

        res.status(200).send({ userId: user._id })

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
})

router.post('/google-login', async (req: Request, res: Response): Promise<any> => {

    try {
        const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.credential}`);
        const googleUser = await googleResponse.json();
        // console.log(googleUser);
        if (!googleUser.email) {
            return res.status(400).json({ message: "Invalid Google Token" });
        }

        // Check if user exists in DB
        let user = await User.findOne({ email: googleUser.email });
        if (!user) {
            user = new User({
                email: googleUser.email,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                googleId: googleUser.sub,
                password : null
            })
            await user.save();
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" })

        res.cookie("auth_token", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000
            })

        return res.status(200).send({ userId: user._id })


    }
    catch (e) {
        console.log(e)
    }
}
)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    })

    res.send();
})

export default router;