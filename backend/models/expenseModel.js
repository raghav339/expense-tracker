import mongoose from 'mongoose';

const expenseSchema=new mongoose.Schema({
    title:String,
    amount:Number,
    type:String,
    category:String,
    date:String,
    username:String,
    id:Number
});

const model=mongoose.model("expense",expenseSchema);
export default model;