import express from "express"
import dotenv from "dotenv"
import { clerkMiddleware } from '@clerk/express'
import fileUpload from "express-fileupload"
import path from "path"
import cors from "cors"
import cron from "node-cron"
import fs from "fs"

import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import songRoutes from "./routes/songRoutes.js"
import albumRoutes from "./routes/albumRoutes.js"
import statRoutes from "./routes/statRoutes.js"
import { db } from "./lib/db.js"


dotenv.config()

const __dirname = path.resolve()
const app = express()
const PORT = process.env.PORT;

const corsOptions = {
    origin: ['http://localhost:3000', 'https://tunifyx.vercel.app'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(clerkMiddleware()) //Adds auth to req obj so that we can get req.auth.userId
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5 mb max file size
    }
})) // the files uploaded by the client are saved in the temp folder here in the backend and will be deleted after the completion of uploading to cloudinary

const tempDir = path.join(process.cwd(), "temp")
cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log(err)
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(tempDir, file), err => { });
            }
        });
    }
})

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ success: false, message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message })
})

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    db()
})