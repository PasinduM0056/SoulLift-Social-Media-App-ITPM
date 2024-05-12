// adminRoutes.js

import express from "express";
import { getUsersWithBusinessProfiles, approveBusinessProfile, getUserWithOrganizationProfile, approveOrganizationProfile} from "../controllers/adminController.js";


const router = express.Router();

router.get("/users/business-profiles", getUsersWithBusinessProfiles);
router.put("/users/approve-business-profile/:userId", approveBusinessProfile);
router.get("/users/organization-profiles", getUserWithOrganizationProfile);
router.put("/users/approve-organization-profile/:userId", approveOrganizationProfile);
export default router;
