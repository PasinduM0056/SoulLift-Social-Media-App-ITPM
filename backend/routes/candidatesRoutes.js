import express from 'express';
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
import {addCandidate, getAllCandidates, acceptCandidate, deleteCandidate} from '../controllers/CandidateController.js';

router.post("/candidate-apply", protectRoute, addCandidate);
router.get("/get-all-candidates", protectRoute, getAllCandidates);
router.post("/Shortlisted-candidates", protectRoute, acceptCandidate);
router.delete("/Delete-candidates/:id", protectRoute, deleteCandidate);
export default router;