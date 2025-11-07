import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controller/userController.js"

const userRauter = express.Router()

userRauter.get("/getcurrentuser", isAuth, getCurrentUser)

export default userRauter;