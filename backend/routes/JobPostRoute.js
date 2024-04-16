import express from 'express';
import {submitJobPost} from '../controllers/postaJobController.js';
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/Post-a-job", protectRoute, submitJobPost);
export default router;

