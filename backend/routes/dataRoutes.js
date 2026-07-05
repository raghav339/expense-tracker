import express from 'express';
import expense from '../models/expenseModel.js';
const router=express.Router();

router.post("/",async (req,res)=>{
    const username=req.cookies.username;
    if (!username) {
        return res.status(401).json({
            message: "Please sign in first"
        });
    }

    try
    {
        await expense.create({
            title:req.body.title,
            id:req.body.id,
            amount:req.body.amount,
            type:req.body.type,
            category:req.body.category,
            date:req.body.date,
            username:username
        });
        res.status(201).json({
            message:"SAVED!"
        });
    }
    catch(err)
    {
        res.status(500).json({
            message: err.message
        });
    }
});

router.get("/",async(req,res)=>{
    const username=req.cookies.username;

    if (!username) {
        return res.status(401).json({
            message: "Please sign in first"
        });
    }

    const data=await expense.find({
        username:username
    });
    res.json({
        message:"SUCCESSFUL",
        transactions:data
    });

});

router.delete("/",async(req,res)=>{
    const id=req.body.id;
    await expense.deleteOne({id:id});
    res.json({
        message:"Done!"
    });
})

export default router;