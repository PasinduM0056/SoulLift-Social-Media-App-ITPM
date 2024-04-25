import express from 'express';
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
import addCandidate from '../controllers/CandidateController.js';

router.post("/candidate-apply", protectRoute, addCandidate);


export default router;