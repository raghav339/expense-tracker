import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    username:String,
    password:String
});

const model=mongoose.model("users",userSchema);

export default model;