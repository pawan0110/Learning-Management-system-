import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRauter from "./route/userRoute.js";

dotenv.config();

const port = process.env.PORT || 3000

const app= express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))


app.use("/api/auth", authRouter)
app.use("/api/user", userRauter)


app.listen(port, () => {
    console.log(`server is listen on port ${port}`)
    connectDb()
    
})