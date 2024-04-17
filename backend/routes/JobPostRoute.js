import express from 'express';
import {saveJobDetails} from '../controllers/postaJobController.js';
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/Post-a-job", protectRoute, saveJobDetails);
export default router;

