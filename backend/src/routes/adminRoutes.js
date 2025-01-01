import { Router } from "express";
import { addSong, removeSong } from "../controllers/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.post("/songs", protectRoute, requireAdmin, addSong)
router.delete("/songs/:id", protectRoute, requireAdmin, removeSong)
export default router; 