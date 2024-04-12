// adminController.js

import User from "../models/userModel.js";

const getUsersWithBusinessProfiles = async (req, res) => {
  try {
    const users = await User.find({ isBusiness: false }).select("name address idNumber companyName companyAbout identityVerify");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveBusinessProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isBusiness: true });
    res.status(200).json({ message: "Business profile approved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getUsersWithBusinessProfiles, approveBusinessProfile };
