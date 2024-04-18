import express from 'express';
import {saveJobDetails , getAllJobs} from '../controllers/postaJobController.js';
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/Post-a-job", protectRoute, saveJobDetails);
router.get("/Get-all-jobs", protectRoute, getAllJobs);
export default router;

