
import express from 'express';
import prisma from '../db/index.js';
import dotenv from 'dotenv';
import { z } from "zod";
import jwt from "jsonwebtoken";

dotenv.config();


const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),

});


const router=express.Router();


router.post("/",async(req,res)=>{

    const {email,password}=req.body;

    try{
        userSigninSchema.parse(req.body);

    }catch(error){
        return res.status(400).json({error:error.errors});
    }


    try{

        const user=await prisma.user.findUnique({
            where:{
                email:email,
            },
        })

        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        if(user.password!==password){
            return res.status(400).json({error:"Password is incorrect"});
        }



        const balance=await prisma.balance.findFirst({
            where:{
                userId:user.id,
            },
        });

       



        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET);

        res.json({
            message:"User signed in successfully",
            token,
            user,
            success:true,
            balance,

        })

    }catch(error){

        res.status(500).json({error:"An error occurred while signing in the user",message:error.message});





    }





})


export default router;










