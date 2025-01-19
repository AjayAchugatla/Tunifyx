import { Router } from "express";
import { getAlbums, getAlbum } from "../controllers/albumController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();


router.get("/", getAlbums);
router.get("/:albumId", getAlbum);

export default router;