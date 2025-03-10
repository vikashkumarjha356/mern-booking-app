import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { UserType } from "../shared/types";



const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    googleId: { type: String }
})

userSchema.pre("save", async function (next) {
    if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next();
})



const User = mongoose.model<UserType>("User", userSchema);
export default User;