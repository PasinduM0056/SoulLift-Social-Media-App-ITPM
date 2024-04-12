// adminController.js

import User from "../models/userModel.js";

const getUsersWithBusinessProfiles = async (req, res) => {
  try {
    const users = await User.find({ isBusiness: false }).select("businessName businessAddress businessAbout idNumber");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//organization
const getUserWithOrganizationProfile = async (req, res) => {
  try {
    const userss = await User.find({ isOrganization: false }).select("OrganizationName OrganizationAddress OrganizationAbout IDnumber");
    res.status(200).json(userss);
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

//Organization
const approveOrganizationProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isOrganization: true });
    res.status(200).json({ message: "Organization profile approved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export { getUsersWithBusinessProfiles, approveBusinessProfile, getUserWithOrganizationProfile, approveOrganizationProfile };
