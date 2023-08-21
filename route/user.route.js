const express=require("express");
const userRouter=express.Router();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config()
const { userModel } = require("../model/user.model");


userRouter.post("/signup",async(req,res)=>{
   try {
    const {email,password,confirm_password}=req.body;
    const existinguser= await userModel.find({email});

    if (existinguser.length){
        return res.status(200).json({msg:"user has already registered,please login"})
    }

    bcrypt.hash(password,5,async(err,hash)=>{

        if (err){
            return res.status(400).json({msg:err.message})
        }
        else{
            const newuser= new userModel({email,password:hash,confirm_password});
            await newuser.save();
            return res.status(200).json({msg:"user registered successfully"})
        }
    })
   } catch (error) {
    res.status(500).json({error:error.message})
   }
})



userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existinguser= await userModel.findOne({email});
        if (!existinguser){
           
            return res.status(404).json({msg:"user not found,please create account"})
        }
        bcrypt.compare(password,existinguser.password,async(err,result)=>{
            if (result){
                const token=jwt.sign({userID:existinguser._id,username:existinguser.name},process.env.secretKey);
                return res.status(200).json({msg:"login successfully",token:token})
            }
            else{
                return res.status(400).json({error:err.message})
            }
        })
    } 
    catch (error) {
     res.status(500).json({error:error.message})
    }
})

module.exports={userRouter}