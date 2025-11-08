import sendMail from "../config/sendMail.js";
import genToken from "../config/token.js";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User is already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `signUp error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logOut = async (req,res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"logOut successfully"})
    } catch (error) {
        return res.status(500).json({message:`logOut error ${error}`})
    }
}

export const sendOtp = async (req,res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString()
    user.resetOtp = otp,
    user.otpExpires=Date.now() + 5*60*1000,
    user.isOtpVerified= false

    await user.save()
    await sendMail(email,otp)
    return res.status(200).json({message:"OTP send"})
  } catch (error) {
    return res.status(500).json({message:`send OTP error ${error}`})
  }
}

export const verifyotp = async (req,res) => {
  try {
    const {email,otp} = req.body
    const user = await User.findOne({email})
    if(!user || user.resetOtp!=otp || user.otpExpires<Date.now()){
      return res.status(400).json({message:"Invalid OTP"})
    }
    user.isOtpVerified=true
    user.resetOtp=undefined
    user.otpExpires=undefined
    await user.save()
    return res.status(200).json({message:"OTP varified"})
  } catch (error) {
    return res.status(500).json({message:`verify OTP error ${error}`})
  }
}
