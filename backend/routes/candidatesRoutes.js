import express from 'express';
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
import {addCandidate, getAllCandidates} from '../controllers/CandidateController.js';

router.post("/candidate-apply", protectRoute, addCandidate);
router.get("/get-all-candidates", protectRoute, getAllCandidates);
export default router;