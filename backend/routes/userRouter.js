import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { UserModel } from "../models/User.js";

const router = express.Router();

//Route 1: for new user to sign up
router.post("/signup", async (req,res) =>{
    const {name,email, password} = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ message: "User already exists!" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration." });
    }
    
});

//Route 2: for existing user to login
router.post("/login", async (req,res) =>{
    const {email , password} = req.body;
    const user = await UserModel.findOne({email});
    console.log('Until this part ok');
    if(!user){
        return res.json({message: "No user with entered credentials exists."});
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
    return res.json({message: "Please login with valid email and password."});
    }
    const token = jwt.sign({id: user._id}, "mytodoapp");
    return res.json({token:token,userID:user._id});

});

//get username 
router.get("/", async(req,res)=>{
    const userId = req.query.userId;
    try{
        const user = await UserModel.findOne({_id:userId});
        console.log(userId,user);
        if(!user){
            return res.json({message:"Invalid user"})
        }
        return res.json({user});
    }
    catch(err){
        return res.json(err);
    }  
})




export {router as userRouter};