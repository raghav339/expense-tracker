import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import user from '../models/userModel.js';
dotenv.config();

const router=express.Router();

router.post("/signup",async function (req,res){
    const username=req.body.username;
    const password=req.body.password;
    const hashed=await bcrypt.hash(password,10);
    const found=await user.findOne({username:username});
    if(found)
    {
        res.status(409).json({
            message: "User already Exists"
        });
        return;
    }
    try
    {   
        await user.create({
            username:username,
            password:hashed
        })
        res.status(201).json({message:"SAVED!"});
    }   
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }

});

router.post("/signin",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const data=await user.findOne({
        username:username
    });
    if(!data)
    {
        res.status(404).json({
            message: "User Not Found"
        });
        return;
    }
    const verify=await bcrypt.compare(password,data.password);
    if(!verify)
    {
        res.status(401).json({
            message: "Wrong Password"
        });
        return;
    }

    
    res.cookie("username",username);
    res.json({
        message:"SIGNED IN!"
    });

});

router.get("/logout",(req,res)=>{
    res.clearCookie("username");
    res.send("Logged Out");
})

export default router;