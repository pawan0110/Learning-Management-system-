import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `GetCurrentUser error ${error}` });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, bio } = req.body;
    let photoUrl;
    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      photoUrl = cloudinaryRes.url; // only store the URL string
    }

    const user = await User.findByIdAndUpdate(userId, {
      name,
      bio,
      photoUrl,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Update Profile Error  ${error}` });
  }
};
