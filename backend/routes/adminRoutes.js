// adminRoutes.js

import express from "express";
import { getUsersWithBusinessProfiles, approveBusinessProfile } from "../controllers/adminController.js";


const router = express.Router();

router.get("/users/business-profiles", getUsersWithBusinessProfiles);
router.put("/users/approve-business-profile/:userId", approveBusinessProfile);

export default router;
