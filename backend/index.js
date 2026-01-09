import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRauter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import paymentRouter from "./route/paymentRoute.js";
import reviewRouter from "./route/reviewRoute.js";
import aiRouter from "./route/aiRoute.js";
dotenv.config();

const port = process.env.PORT || 8080

const app= express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://codenex.vercel.app/"];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
}));


app.use("/api/auth", authRouter)
app.use("/api/user", userRauter)
app.use("/api/course", courseRouter)
app.use("/api/payment", paymentRouter)
app.use("/api/review", reviewRouter)
app.use("/api/ai", aiRouter)


app.listen(port, () => {
    console.log(`server is listen on port ${port}`)
    connectDb()
    
})
