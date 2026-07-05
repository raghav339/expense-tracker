import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'dns';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import dotenv from "dotenv";


dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();
const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

app.use("/",authRoutes);
app.use("/",dataRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log("MongoDB connect"))
  .catch((err)=> console.log(err));

app.listen(3000,()=>{console.log("server started!")});

