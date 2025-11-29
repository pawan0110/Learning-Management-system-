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
    const { name, bio , description} = req.body;

      const updateData = {};

    if (name) updateData.name = name;

    // Accept both bio or description
    if (bio) updateData.bio = bio;
    if (description) updateData.bio = description;

   
    if (req.file) {
      const cloudinaryRes = await uploadOnCloudinary(req.file.path);
      updateData.photoUrl = cloudinaryRes.url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: "-password" }  
       
    );
        console.log("BODY:", req.body);
console.log("FILE:", req.file);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Update Profile Error: ${error}` });
  }
};
