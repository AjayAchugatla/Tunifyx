import { Router } from "express";
import { addSong, removeSong, createAlbum, deleteAlbum, checkAdmin } from "../controllers/adminController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin)
router.post("/songs", addSong)
router.delete("/songs/:id", removeSong)
router.post("/albums", createAlbum)
router.delete("/albums/:id", deleteAlbum)

export default router; 